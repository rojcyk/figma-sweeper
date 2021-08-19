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

const FolderStyle = styled.svg``

// ******************** //
// Components
// ******************** //

export const Folder = (props: Props) => {
  return (
    <FolderStyle
      width="16"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path d="M.866 1.866A1.25 1.25 0 011.75 1.5h3.5c.393 0 .764.186 1 .5l.9 1.2a.75.75 0 00.6.3h6.5a1.25 1.25 0 011.25 1.25v8.5a1.25 1.25 0 01-1.25 1.25H1.75c-.69 0-1.25-.56-1.25-1.25V2.75c0-.332.132-.65.366-.884z" stroke="#000"/>
      </g>
      
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0h16v16H0z"/>
        </clipPath>
      </defs>
    </FolderStyle>
  )
}
