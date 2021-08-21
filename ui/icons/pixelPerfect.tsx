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
    <PixelPerfectStyle width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" fill="white"/>
      <path d="M0 9V10L10 10V20H11V9H0Z" fill="black"/>
      <rect y="10" width="10" height="10" fill="black" fillOpacity="0.2"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 2H11V0H10V2ZM11 5H10V3H11V5ZM11 8H10V6H11V8ZM14 9H12V10H14V9ZM15 9H17V10H15V9ZM20 9H18V10H20V9Z" fill="black"/>
    </PixelPerfectStyle>
  )
}
