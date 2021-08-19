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

const PixelPerfectStyle = styled.svg``

// ******************** //
// Components
// ******************** //

export const PixelPerfect = (props: Props) => {
  return (
    <PixelPerfectStyle width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 2V0H7v2h1zm0 2v2H7V4h1zM7 8H1v1h6v6h1V8H7zm5 1h-2V8h2v1zm2 0h2V8h-2v1z" fill="#000"/>
      <path fill="#000" fillOpacity=".3" d="M1 9h6v6H1z"/>
    </PixelPerfectStyle>
  )
}
