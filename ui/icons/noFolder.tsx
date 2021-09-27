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

export const NoFolder = (props: Props) => {
  return (
    <FolderStyle
      width="20"
      height="20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75 4a.75.75 0 0 0-.75.75v.141a.5.5 0 1 1-1 0V4.75A1.75 1.75 0 0 1 3.75 3h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 0 0 .2.1h6.5A1.75 1.75 0 0 1 18 6.75v8.5a1.75 1.75 0 0 1-1.232 1.672.41.41 0 0 1-.378-.086l-.34-.276a.315.315 0 0 1 .2-.56.75.75 0 0 0 .75-.75v-8.5a.75.75 0 0 0-.75-.75h-6.5a1.25 1.25 0 0 1-1-.5l-.9-1.2a.752.752 0 0 0-.6-.3h-3.5Z" fill="#000"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.015 8.611.704 7.525a.5.5 0 0 1 .638-.77l13.964 11.57a.5.5 0 0 1-.637.77l-2.539-2.102a.526.526 0 0 1-.089.007H3.75A1.75 1.75 0 0 1 2 15.25V8.738c0-.045.005-.087.015-.127ZM10.932 16H3.75a.75.75 0 0 1-.75-.75V9.427L10.932 16Z" fill="#000"/>
    </FolderStyle>
  )
}
