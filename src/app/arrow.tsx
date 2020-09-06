import * as React from "react"
import styled from "styled-components"

const ArrowStyles = styled.svg`
  margin-right: 12px;
  transition: transform ${220}ms ease-out;
`

interface ArrowProps {
  style?: React.CSSProperties
  direction: "up" | "down" | "left" | "right"
}

export const Arrow: React.StatelessComponent<ArrowProps> = (props: ArrowProps) => {
  let transform

  switch (props.direction) {
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
    <ArrowStyles
      width="4"
      height="6"
      viewBox="0 0 4 6"
      style={{ transform: transform, ...props.style }}
    >
      <path d="M0.125 6L0.125 0L3.875 3L0.125 6Z" />
    </ArrowStyles>
  )
}
