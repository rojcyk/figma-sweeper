import React, { useState, useContext } from "react"
import styled from 'styled-components'
import io from 'figmaio/ui'
import { Route, NavLink, HashRouter } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

// import { SectionWrapper, SectionHeader, SectionContent } from '@components/section'
// import { Checkbox } from "@components/checkbox"
// import { Content } from "@components/content"
import { Arrow } from "@icons/arrow"
import { Button } from "@components/button"
import { LinterContext } from "./linterContext"
import { MAIN_ROUTE } from '@routes'
import { APP_LINT, SELECTION_UPDATE } from '@events'
import { NavigationBar } from '@components/navigationBar'
import { P } from '@components/typography'
import { SEPARATOR, WHITE } from "@constants/ui"

const ErrorIcon = styled.div`
  margin-right: 12px;
`


const ErrorWrapper = styled.div`
  display: flex;
  padding: 16px 16px 14px 16px;
  /* border-bottom: 1px solid ${SEPARATOR}; */
  background-color: ${WHITE};
`

const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ErrorTitle = styled.span`
  display: block;
  font-weight: 500;
  font-size: 13px;
  margin-bottom: 2px;
`

const ErrorLayerCount = styled(P)`
  font-size: 11px;
  margin-bottom: 10px;
`

const ErrorActions = styled.div`
  display: flex;
  font-size: 12px;

  & > *:not(:last-child) {
    margin-right: 4px;
  }
`

export const LintError = ({
  icon,
  title,
  actionLabel,
  action,
  errors,
  rule
}: {
  title: string,
  rule?: string,
  icon: React.ReactElement
  actionLabel?: string,
  action?: Function,
  errors: any[]
}) => {
  const settings = useContext(LinterContext)
  const [index, setIndex] = useState(-1)

  const selectElements = (direction: 'next' | 'previous') => {
    let newIndex = 0

    switch (direction) {
      case 'next':
        if (index === -1 || index + 1 === errors.length) {
          newIndex = 0
        } else {
          newIndex = index + 1
        }
        break
      default:
        if (index === -1 || index === 0) {
          newIndex = errors.length - 1
        } else {
          newIndex = index - 1
        }
        break
    }

    setIndex(newIndex)
    io.send(SELECTION_UPDATE, [errors[newIndex]])
  } 

  return (
    <ErrorWrapper>
      <ErrorIcon>
        {icon}
      </ErrorIcon>

        <ErrorContent>
          <ErrorTitle>{title}</ErrorTitle>

          {errors.length === 1 ?
            <ErrorLayerCount>{errors.length} layer matching {rule ? rule : 'this' } rule</ErrorLayerCount> :
            <ErrorLayerCount>{errors.length} layers matching {rule ? rule : 'this' } rule</ErrorLayerCount>
          }

          <ErrorActions>
            {actionLabel && action && 
              <Button theme='cta' presence='outline' size={'small'} inline={true} label={actionLabel} onClick={() => {
                if (action) action()
              }} />
            }

            <Button theme='primary' size={'small'} inline={true} iconLeft={<Arrow direction='left' />}  onClick={() => {
              selectElements('previous')
            }} />

            <Button theme='primary' size={'small'} inline={true} iconLeft={<Arrow direction='right' />}  onClick={() => {
              selectElements('next')
            }} />
          </ErrorActions>
        </ErrorContent>
    </ErrorWrapper>
  )
}

export default LintError