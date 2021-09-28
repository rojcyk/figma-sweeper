import React, { useState, useContext, useEffect } from "react"
import styled from 'styled-components'
import io from 'figmaio/ui'
import { NavLink } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Button } from "@components/button"
import { LinterContext } from "../components/linterContext"
import { SETTINGS_ROUTE } from '@routes'
import { SEPARATOR } from '@ui'
import { P } from '@components/typography'
import { Eye } from '@icons/eye'
import { NoFolder } from '@icons/noFolder'
import { Folder } from '@icons/folder'
import { Style } from '@icons/style'
import { Text } from '@icons/text'
import { PixelPerfect } from '@icons/pixelPerfect'
import { NavigationBar } from '@components/navigationBar'
import LintError from '@components/error'
import { defaultValues } from '@utils/canvasErrorManager'

import {
  APP_LINT,
  ERRORS_UPDATE,
  LINT_STOP,
  LINT_NO_GROUPS,
  LINT_DELETE_HIDDEN,
  LINT_UNGROUP_SINGLE_GROUPS,
  LINT_MAKE_PIXEL_PERFECT,
  LINT_MATCH_FILL_STYLES,
  LINT_MATCH_TEXT_STYLES
} from '@events'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 64px 0;
  min-height: 100%;
`

const ErrorWrapper = styled.div`
  & > * {
    border-bottom: 1px solid ${SEPARATOR};
  }
`

const LintWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 35%, rgba(255,255,255,0) 100%);

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`

const EmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  flex-grow: 1;
  padding-left: 4.4rem;
  padding-right: 4.4rem;
  text-align: center;
  color: GRAY;
  font-size: FS_SMALL;
  border-top: 1px solid ${SEPARATOR};
`

const countErrors = (errors: Plugin.CanvasErrors) => {
  let count = 0

  Object.entries(errors).forEach((entry) => {
    const [key, keyErrrors] = entry
    count += keyErrrors.length
  })

  return count
}

class LoopManager {
  inProgress: boolean
  counter: number
  settings: Plugin.Settings
  newLint: boolean

  constructor (settings: Plugin.Settings) {
    this.inProgress = false
    this.counter = 0
    this.settings = settings
    this.newLint = true
  }

  public loop (timeout: number = 700) {
    if (this.inProgress) {
      io.send(APP_LINT, {
        newLint: this.newLint,
        settings: this.settings
      })
      this.counter++
      this.newLint = false

      setTimeout(() => {
        this.loop()
      }, timeout)
    }
  }

  public off () {
    this.inProgress = false
    this.newLint = true
  }
}

export const LintView = ({ initErrors } : { initErrors: Plugin.CanvasErrors}) => {
  const { settings, paintStyles, textStyles } = useContext(LinterContext)
  const [inProgress, setInProgress] = useState(false)
  const [layerName, setLayerName] = useState('')
  const [errors, setErrors] = useState(initErrors)

  const loopManager = new LoopManager(settings)
  const errorCount = countErrors(errors)
  const title = errorCount === 0 ? 'No errors' : `${errorCount} Errors`
  const nameCase = settings.layerNameCase === 'noCase' ? 'no-default-name' : settings.layerNameCase

  const matchFillStyleLabel = paintStyles.length > 0 ? 'Fill' : undefined
  const matchTextStyleLabel = textStyles.length > 0 ? 'Match' : undefined

  useEffect(() => {
    io.on(LINT_STOP, () => {
      setInProgress(false)
      setLayerName('')
    })
    io.on(ERRORS_UPDATE, ({ errors, name }) => {
      setErrors(errors)
      setLayerName(name)
    })
  }, [])

  useEffect(() => {
    if (inProgress) {
      loopManager.inProgress = true
      loopManager.loop()
    }

    return () => {
      setErrors(defaultValues)
      loopManager.off()
    }
  }, [inProgress])

  return (
    <Main>
      <NavigationBar title={title} pill={layerName} action={
        <NavLink to={SETTINGS_ROUTE} style={{ textDecoration: 'none' }}>
          <Button presence={'naked'} inline={true} label={'Settings'} />
        </NavLink>
      } />

        {inProgress && errorCount !== 0 &&
          <ErrorWrapper>
            {errors.deleteHidden.length > 0 &&
              <LintError title={'Hidden layer'} actionLabel='Delete' action={() => {
                io.send(LINT_DELETE_HIDDEN, errors.deleteHidden)
              }} errors={errors.deleteHidden} icon={<Eye />}/>
            }

            {errors.noGroups.length > 0 &&
              <LintError title={'No groups'} actionLabel='Framify 🪄' action={() => {
                io.send(LINT_NO_GROUPS, errors.noGroups)
              }}
              errors={errors.noGroups} icon={<NoFolder />} />
            }

            {errors.ungroupSingleGroup.length > 0 &&
              <LintError title={'Ungroup single-layer groups'} actionLabel='Ungroup' action={() => {
                io.send(LINT_UNGROUP_SINGLE_GROUPS, errors.ungroupSingleGroup)
              }}
              errors={errors.ungroupSingleGroup} icon={<Folder />} />
            }

            {errors.pixelPerfect.length > 0 &&
              <LintError title={'Make pixel perfect'} actionLabel='Make ✨' action={() => {
                io.send(LINT_MAKE_PIXEL_PERFECT, errors.pixelPerfect)
              }}
              errors={errors.pixelPerfect} icon={<PixelPerfect />} />
            }

            {errors.layerNameLinting.length > 0 &&
              <LintError title={'Name linting'} rule={nameCase} errors={errors.layerNameLinting} icon={<Text />} />
            }

            {errors.enforceUploadedStyles.length > 0 &&
              <LintError title={'Unsupported styles'} errors={errors.enforceUploadedStyles} icon={<Style />} />
            }

            {errors.requireTextStyles.length > 0 &&
              <LintError title={'Require text styles'} actionLabel={matchTextStyleLabel} action={() => {
                io.send(LINT_MATCH_TEXT_STYLES, errors.requireTextStyles)
              }}
              errors={errors.requireTextStyles} icon={<Style />} />
            }

            {errors.requireFillStyles.length > 0 &&
              <LintError title={'Require fill styles'} actionLabel={matchFillStyleLabel} action={() => {
                io.send(LINT_MATCH_FILL_STYLES, errors.requireFillStyles)
              }} errors={errors.requireFillStyles} icon={<Style />} />
            }

            {errors.requireStrokeStyles.length > 0 &&
              <LintError title={'Require stroke styles'} errors={errors.requireStrokeStyles} icon={<Style />} />
            }

            {errors.requireEffectStyles.length > 0 &&
              <LintError title={'Require effect styles'} errors={errors.requireEffectStyles} icon={<Style />} />
            }
          </ErrorWrapper>
        }

        {inProgress && errorCount === 0 &&
          <EmptyWrapper>
            <P>There are no errors for the selected component 💪</P>
          </EmptyWrapper>
        }

        {inProgress === false &&
          <EmptyWrapper>
            <P>Once you start linting you will see errors here</P>
          </EmptyWrapper>
        }

      <LintWrapper>
        {inProgress === false &&
          <>
            <Button inline={false} onClick={() => {setInProgress(true)}} label={'Start linting ...'} />
          </>
        }

        {inProgress === true &&
          <>
            <Button inline={false} theme={'primary'}  onClick={() => {
              setInProgress(false)
              setLayerName('')
              }} label={'Stop linting'} />
          </>
        }
      </LintWrapper>
    </Main>
  )
}
