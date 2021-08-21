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
      width="20"
      height="20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15 12a5 5 0 01-10 0c0-1.875 1.052-4.43 2.363-6.6.644-1.065 1.316-1.982 1.889-2.62A5.423 5.423 0 0110 2.07l.033.024c.184.139.427.366.715.687.573.637 1.245 1.554 1.889 2.618C13.948 7.57 15 10.125 15 12zm1 0a6 6 0 01-12 0C4 7.686 8.686 1 10 1s6 6.686 6 11zm-9.97.499c-.033-.274.194-.499.47-.499.276 0 .496.225.541.498.104.625.402 1.184.83 1.615.08.08.129.19.129.303 0 .462-.496.744-.823.418a3.988 3.988 0 01-1.146-2.335z" fill="#000"/>
    </StyleStyle>
  )
}