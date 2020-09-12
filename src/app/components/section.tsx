import React from "react"
import styled from "styled-components"
import AnimateHeight from "react-animate-height"

import { WHITE, SEPARATOR, BACKGROUND } from "../../constants/ui"

// ******************************** //
// Interface
// ******************************** //

export interface SectionProps {
  expanded: boolean
  buttonHandler: Function
  content: any
  button: any
  isActive: boolean
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
  active: boolean
}>`
  transition: all 0.3s ease-out;
  background-color: ${WHITE};
  // padding-top: ${(props) => (props.expanded ? "3px" : "0")};
  // padding-bottom: ${(props) => (props.expanded ? "4px" : "1px")};
  border-top: ${(props) => (props.expanded ? `3px solid ${SEPARATOR}` : `0 solid ${SEPARATOR}`)};
  border-bottom: ${(props) =>
    props.expanded ? `4px solid ${SEPARATOR}` : `1px solid ${SEPARATOR}`};

  ${({ active }) =>
    active
      ? `
    `
      : `
      pointer-events: none;
      background-color: ${BACKGROUND};
      `}
`

// ******************************** //
// Section Class
// ******************************** //

export const SectionWrapper = ({
  content,
  button,
  buttonHandler,
  expanded,
  isActive
}: SectionProps) => {
  const height = expanded ? "auto" : 0

  return (
    <Wrapper expanded={expanded} active={isActive}>
      <ButtonWrapper onClick={() => buttonHandler()}>{button}</ButtonWrapper>

      <AnimateHeight duration={220} height={height}>
        {content}
      </AnimateHeight>
    </Wrapper>
  )
}
