import React from "react"
import styled from "styled-components"
import AnimateHeight from "react-animate-height"

import { WHITE, SEPARATOR } from "../constants/ui"

// ******************************** //
// Interface
// ******************************** //

export interface SectionProps {
  expanded: boolean
  buttonHandler: Function
  content: any
  button: any
}

interface SectionState {
  expanded: boolean
  height: number | string
  toggle?: any
  content?: any
  bg?: string
}

// ******************************** //
// Styles
// ******************************** //

const ButtonWrapper = styled.div`
  cursor: pointer;
`

const Wrapper = styled.div<{
  expanded: boolean
}>`
  transition: all 0.3s ease-out;
  background-color: ${WHITE};
  // padding-top: ${(props) => (props.expanded ? "3px" : "0")};
  // padding-bottom: ${(props) => (props.expanded ? "4px" : "1px")};
  border-top: ${(props) => (props.expanded ? `3px solid ${SEPARATOR}` : `0 solid ${SEPARATOR}`)};
  border-bottom: ${(props) =>
    props.expanded ? `4px solid ${SEPARATOR}` : `1px solid ${SEPARATOR}`};
`

// ******************************** //
// Section Class
// ******************************** //

export const SectionWrapper = ({ content, button, buttonHandler, expanded }: SectionProps) => {
  const Content = content
  const Button = button
  const height = expanded ? "auto" : 0

  return (
    <Wrapper expanded={expanded}>
      <ButtonWrapper onClick={() => buttonHandler()}>
        <Button expanded={expanded} />
      </ButtonWrapper>

      <AnimateHeight duration={220} height={height}>
        <Content expanded={expanded} />
      </AnimateHeight>
    </Wrapper>
  )
}
