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
      width="20"
      height="20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.22 4.22A.75.75 0 013.75 4h3.5c.235 0 .459.112.6.3l.9 1.2a1.25 1.25 0 001 .5h6.5a.75.75 0 01.75.75v8.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V4.75a.75.75 0 01.22-.53zM3.75 3A1.75 1.75 0 002 4.75v10.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-8.5A1.75 1.75 0 0016.25 5h-6.5a.25.25 0 01-.2-.1l-.9-1.2c-.33-.44-.85-.7-1.4-.7h-3.5zm7.379 11h-1.18V9.477h-.07l-1.383.96V9.376l1.457-1.012h1.176V14z" fill="#000"/>
    </FolderStyle>
  )
}
