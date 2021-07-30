import React from "react"
import styled from "styled-components"
import AnimateHeight from "react-animate-height"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { WHITE, SEPARATOR, ANIMATION_SPEED_MS } from "../../constants/ui"

// ******************** //
// Interface
// ******************** //

export interface SectionProps {
  expanded: boolean
  toggleHandler: Function
  content: JSX.Element
  header: JSX.Element
  isActive: boolean
}

// ******************** //
// LOCAL HELPERS
// ******************** //

const Wrapper = styled.div<{
  expanded: boolean
}>`
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;
  background-color: ${WHITE};
  border-top: ${(props) => (props.expanded ? `3px solid ${SEPARATOR}` : `0 solid ${SEPARATOR}`)};
  border-bottom: ${(props) =>
    props.expanded ? `4px solid ${SEPARATOR}` : `1px solid ${SEPARATOR}`};
`

// ******************** //
// Component
// ******************** //

export const SectionWrapper = ({
  content,
  header,
  toggleHandler,
  expanded,
  isActive
}: SectionProps) => {
  const height = expanded ? "auto" : 0

  return (
    <Wrapper expanded={expanded}>
      <div
        onClick={() => {
          if (isActive) toggleHandler()
        }}
      >
        {header}
      </div>

      <AnimateHeight duration={ANIMATION_SPEED_MS} height={height}>
        {content}
      </AnimateHeight>
    </Wrapper>
  )
}
