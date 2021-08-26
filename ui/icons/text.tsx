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

const TextStyle = styled.svg``

// ******************** //
// Components
// ******************** //

export const Text = (props: Props) => {
  return (
    <TextStyle
      width="20"
      height="20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
        <path fill="#000" d="M4 4h11v1H4zM7 15h5v1H7z"/>
        <path fill="#000" d="M4 4h1v3H4zM14 4h1v3h-1zM9 5h1v10H9z"/>
    </TextStyle>
  )
}
