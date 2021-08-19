import * as React from "react"
import styled from "styled-components"

// ******************** //
// Interface
// ******************** //

interface Props {
  style?: React.CSSProperties
  onClick?: Function
}

// ******************** //
// Styles
// ******************** //

const StyleStyle = styled.svg``

// ******************** //
// Components
// ******************** //

export const Style = (props: Props) => {
  return (
    <StyleStyle
      width="16"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path fill="#fff" d="M0 0h16v16H0z"/>
      <path d="M11.5 10a3.5 3.5 0 11-7 0c0-1.85.933-3.748 1.916-5.223A18.617 18.617 0 018 2.733a18.617 18.617 0 011.584 2.045C10.567 6.251 11.5 8.15 11.5 10z" stroke="#000"/>
    </StyleStyle>
  )
}