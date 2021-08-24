import React, { useState, useContext, useEffect } from "react"
import styled from 'styled-components'
import io from 'figmaio/ui'
import { Route, NavLink, HashRouter } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { ButtonPrimary, ButtonSecondary, ButtonPrimaryNaked } from "@components/button"
import { LinterContext } from "../components/linterContext"
import { SETTINGS_ROUTE } from '@routes'
import { SEPARATOR } from '@ui'
import { APP_LINT } from '@events'
import { P } from '@components/typography'
import { Arrow } from '@icons/arrow'
import { Eye } from '@icons/eye'
import { Folder } from '@icons/folder'
import { Style } from '@icons/style'
import { Text } from '@icons/text'
import { PixelPerfect } from '@icons/pixelPerfect'
import { NavigationBar } from '@components/navigationBar'
import LintError from '@components/error'
import { defaultValues } from '@utils/canvasErrorManager'

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
  settings: Plugin.SettingsState

  constructor (settings: Plugin.SettingsState) {
    this.inProgress = false
    this.counter = 0
    this.settings = settings
  }

  public loop (timeout: number = 700) {
    if (this.inProgress) {
      console.log(`[Plugin] Pooling for changes ... ${this.counter}`)
      io.send(APP_LINT, this.settings)
      this.counter++

      setTimeout(() => {
        this.loop()
      }, timeout)
    }
  }

  public off () {
    this.inProgress = false
  }
}

export const LintView = ({ errors, setErrors }: { errors: Plugin.CanvasErrors, setErrors: Function }) => {
  const settings = useContext(LinterContext)
  const errorCount = countErrors(errors)
  const nameCase = settings.layerNameCase === 'noCase' ? 'no-default-name' : settings.layerNameCase

  const [inProgress, setInProgress] = useState(false)
  
  const title = errorCount === 0 ? 'No errors' : `${errorCount} Errors`

  useEffect(() => {
    const loopManager = new LoopManager(settings)

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
      <NavigationBar title={title} action={
        <NavLink to={SETTINGS_ROUTE} style={{ textDecoration: 'none' }}>
          <ButtonPrimaryNaked inline={true} label={'Settings'} />
        </NavLink>
      } />
        {inProgress && errorCount !== 0 &&
          <ErrorWrapper>
            {errors.deleteHidden.length > 0 &&
              <LintError title={'Hidden layer'} buttonLabel='Delete' errors={errors.deleteHidden} icon={<Eye />}/>
            }

            {errors.ungroupSingleGroup.length > 0 &&
              <LintError title={'Ungroup single-layer groups'} buttonLabel='Ungroup' errors={errors.ungroupSingleGroup} icon={<Folder />} />
            }

            {errors.pixelPerfect.length > 0 &&
              <LintError title={'Make pixel perfect'} buttonLabel='Perfect' errors={errors.pixelPerfect} icon={<PixelPerfect />} />
            }

            {errors.layerNameLinting.length > 0 &&
              <LintError title={'Name linting'} rule={nameCase} errors={errors.layerNameLinting} icon={<Text />} />
            }

            {errors.requireTextStyles.length > 0 &&
              <LintError title={'Require text styles'} errors={errors.requireTextStyles} icon={<Style />} />
            }

            {errors.requireFillStyles.length > 0 &&
              <LintError title={'Require fill styles'} errors={errors.requireFillStyles} icon={<Style />} />
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
            <ButtonPrimary  onClick={() => {setInProgress(true)}} label={'Start linting ...'} />
          </>
        }

        {inProgress === true &&
          <>
            <ButtonSecondary  onClick={() => {setInProgress(false)}} label={'Stop linting'} />
            <ButtonPrimary inline={true} label={'Autofix'} />
          </>
        }
      </LintWrapper>
    </Main>
  )
}
