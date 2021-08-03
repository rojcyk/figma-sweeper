import React from "react"
import styled from "styled-components"
import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { WHITE } from '@ui'
import { APP_LINT } from "@events"
import LinterContext from "../linterContext"
import { ButtonPrimary } from "@components/button"

// ******************** //
// Helpers
// ******************** //

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  height: 70px;
  padding: 16px;
  width: 100%;
  background: ${WHITE};
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
`

// ******************** //
// Component
// ******************** //

class LinterButton extends React.Component<{ isActive: boolean }, {}> {
  render() {
    return (
      <ButtonWrapper>
        <ButtonPrimary
          label={"Start linting"}
          onClick={() => io.send(APP_LINT)}
        />
      </ButtonWrapper>
    )
  }
}

LinterButton.contextType = LinterContext

export default LinterButton