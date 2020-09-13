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

const CloseStyle = styled.svg``

// ******************** //
// Components
// ******************** //

export const Close = (props: Props) => {
  return (
    <CloseStyle
      width="24"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...props.style }}
      onClick={() => (props.onClick ? props.onClick() : null)}
    >
      <path
        d="M7.667 6.646l-1.02 1.02L10.98 12l-4.334 4.333 1.02 1.02L12 13.02l4.333 4.334 1.02-1.02L13.02 12l4.334-4.333-1.02-1.02L12 10.98 7.667 6.646z"
        fill="#333"
      />
    </CloseStyle>
  )
}
