import React, { useState, useContext } from "react"
import styled from 'styled-components'
// import io from 'figmaio/ui'
import { Route, NavLink, HashRouter } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

// import { SectionWrapper, SectionHeader, SectionContent } from '@components/section'
// import { Checkbox } from "@components/checkbox"
// import { Content } from "@components/content"
// import { P } from "@components/typography"
import { ButtonPrimary, ButtonSecondary } from "@components/button"
import { LinterContext } from "../linterContext"
import { MAIN_ROUTE } from '@routes'


const LintWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%);
`

export const LintView = () => {
  const settings = useContext(LinterContext)

  return (
    <div style={{ padding: '16px', paddingBottom: '64px' }}>
      
      <NavLink to={MAIN_ROUTE} style={{ textDecoration: 'none' }}>
        <ButtonSecondary inline={true} label={'Go back'} />
      </NavLink>

      {/* <LintWrapper>
        <NavLink to={MAIN_ROUTE} style={{ textDecoration: 'none' }}>
          <ButtonPrimary label={'Start linting'} icon={<Arrow />} />
        </NavLink>
      </LintWrapper> */}
    </div>
  )
}
