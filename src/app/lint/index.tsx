import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { ButtonSecondary, ButtonDisabledStyle } from "../components/button"

// ******************** //
// Interface
// ******************** //

interface LintButton {
  isActive: boolean
  linterAction: Function
}

// ******************** //
// Helpers
// ******************** //

const Wrapper = styled.div<{
  active: boolean
}>`
  height: 70px;
  padding: 16px;

  ${({ active }) =>
    active
      ? `
      background: rgb(255, 255, 255);
      background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
    `
      : `
      background: none;
    `}
`

// ******************** //
// Component
// ******************** //

export default ({ isActive, linterAction }: LintButton) => {
  return (
    <Wrapper active={isActive}>
      {isActive ? (
        <ButtonSecondary label={"Lint selection"} onClick={() => linterAction()} />
      ) : (
        <ButtonDisabledStyle>Lint selection</ButtonDisabledStyle>
      )}
    </Wrapper>
  )
}
