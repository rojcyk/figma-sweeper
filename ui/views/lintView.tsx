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
import { ButtonPrimary, ButtonSecondary, ButtonPrimaryNaked } from "@components/button"
import { LinterContext } from "../linterContext"
import { MAIN_ROUTE } from '@routes'
import { SEPARATOR } from '@ui'
import { APP_LINT } from '@events'
import { Arrow } from '@icons/arrow'
import { NavigationBar } from '@components/navigationBar'
import LintError from '@components/error'

const Main = styled.div`
  padding: 0 0 64px 0;
`

const ContentWrapper = styled.div`
  border-bottom: 1px solid ${SEPARATOR};
`

const ErrorWrapper = styled.div`
  & > *:not(:last-child) {
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

export const LintView = () => {
  const settings = useContext(LinterContext)

  return (
    <Main>
      <ContentWrapper>
        <NavigationBar title={'4 Errors'} action={
          <NavLink to={MAIN_ROUTE} style={{ textDecoration: 'none' }}>
            <ButtonPrimaryNaked inline={true} label={'Settings'} />
          </NavLink>
        } />

        <ErrorWrapper>
          <LintError title={'Hidden layer'} errors={[[]]} icon={<Arrow />} />
          <LintError title={'Ungroup single-layer groups'} errors={[[]]} icon={<Arrow />} />
          <LintError title={'Make pixel perfect'} errors={[[]]} icon={<Arrow />} />
          <LintError title={'Clear component style overrides'} errors={[[]]} icon={<Arrow />} />
        </ErrorWrapper>
      </ContentWrapper>

      <LintWrapper>
        {/* <NavLink to={MAIN_ROUTE} style={{ textDecoration: 'none', marginRight: '8px' }}>
          <ButtonSecondary inline={true} label={'Back'} />
        </NavLink> */}

        <ButtonPrimary  onClick={() => io.send(APP_LINT)} label={'Lint selection'} />
        <ButtonSecondary inline={true} label={'Autofix'} />
      </LintWrapper>
    </Main>
  )
}
