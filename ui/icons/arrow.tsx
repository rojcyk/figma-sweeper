import * as React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { ANIMATION_SPEED_MS } from "@ui"
import { IconWrapper } from '@components/iconWrapper'

// ******************** //
// Styles
// ******************** //

const ArrowStyles = styled.svg`
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;
`

// ******************** //
// Interface
// ******************** //

interface ArrowProps {
  style?: React.CSSProperties
  direction?: "up" | "down" | "left" | "right"
}

// ******************** //
// Component
// ******************** //

export const Arrow = (props: ArrowProps) => {
  let transform

  const direction = props.direction || "right"

  switch (direction) {
    case "up":
      transform = "rotate(270deg)"
      break
    case "down":
      transform = "rotate(90deg)"
      break
    case "left":
      transform = "rotate(180deg)"
      break
    case "right":
      transform = "rotate(0deg)"
      break
  }

  return (
    <IconWrapper style={{ ...(props.style) }}>
      <ArrowStyles
        width="4"
        height="6"
        viewBox="0 0 4 6"
        style={{ transform: transform }}
      >
        <path d="M0.125 6L0.125 0L3.875 3L0.125 6Z" />
      </ArrowStyles>
    </IconWrapper>
  )
}
