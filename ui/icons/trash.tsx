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

const TrashStyle = styled.svg``

// ******************** //
// Components
// ******************** //

export const Trash = (props: Props) => {
  return (
    <TrashStyle
      width="20"
      height="20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...props.style }}
      onClick={() => (props.onClick ? props.onClick() : null)}
    >
    <path fillRule="evenodd" clipRule="evenodd" d="M10 2H9v2H3v1h1v10a2 2 0 002 2h7a2 2 0 002-2V5h1V4h-6V2zM9 5H5v10a1 1 0 001 1h7a1 1 0 001-1V5H9zM7 7h1v7H7V7zm3 0H9v7h1V7zm1 0h1v7h-1V7z" fill="#000"/>
  </TrashStyle>
  )
}