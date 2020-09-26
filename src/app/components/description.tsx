import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { GRAY, BLUE } from "../../constants/ui"

// ******************** //
// Interface
// ******************** //

export interface DescriptionProps {
  children: any
  style?: React.CSSProperties
}

// ******************** //
// Styles
// ******************** //

export const DescriptionStyle = styled.p`
  display: block;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: ${GRAY};
  margin: 0;
  padding: 0;

  a {
    color: ${BLUE};
    font-weight: 500;
  }
`

// ******************** //
// Component
// ******************** //

export const Description = ({ children, style }: DescriptionProps) => {
  return <DescriptionStyle style={style}>{children}</DescriptionStyle>
}
