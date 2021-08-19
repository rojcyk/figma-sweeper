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
// import { P } from "@components/typography"
import { ButtonPrimary, ButtonSecondary, ButtonPrimaryOutline } from "@components/button"
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
  buttonLabel,
  errors
}: {
  title: string,
  icon: React.ReactElement
  buttonLabel?: string
  errors: any[]
}) => {
  const settings = useContext(LinterContext)

  const selectElements = () => {
    io.send(SELECTION_UPDATE, errors)
  }

  return (
    <ErrorWrapper>
      <ErrorIcon>
        {icon}
      </ErrorIcon>

        <ErrorContent>
          <ErrorTitle>{title}</ErrorTitle>

          {errors.length === 1 ?
            <ErrorLayerCount>{errors.length} layer matching this rule</ErrorLayerCount> :
            <ErrorLayerCount>{errors.length} layers matching this rule</ErrorLayerCount>
          }

          <ErrorActions>
            {buttonLabel && <ButtonPrimaryOutline small={true} inline={true} label={buttonLabel} />}
            <ButtonSecondary small={true} inline={true} label={'Select'} onClick={() => {
              console.log('hovno')
              selectElements()
            }} />
          </ErrorActions>
        </ErrorContent>
    </ErrorWrapper>
  )
}

export default LintError