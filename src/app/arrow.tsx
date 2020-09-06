import * as React from "react"
import styled from "styled-components"

const ArrowStyles = styled.svg`
  margin-right: 12px;
  transition: transform ${300}ms ease-out;
`

interface ArrowProps {
  expanded?: boolean
}

export const Arrow: React.StatelessComponent<ArrowProps> = (props: ArrowProps) => {
  let transform

  if (props.expanded) transform = "rotate(90deg)"
  else transform = "rotate(0deg)"

  return (
    <ArrowStyles width="4" height="6" viewBox="0 0 4 6" style={{ transform: transform }}>
      <path d="M0.125 6L0.125 0L3.875 3L0.125 6Z" />
    </ArrowStyles>
  )
}
