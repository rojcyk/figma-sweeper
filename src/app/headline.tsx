import React from "react"
import styled from "styled-components"

import { BLACK } from "../constants/ui"

// ******************************** //
// Interface
// ******************************** //

export interface HeadlineProps {
  children: any
  style?: React.CSSProperties
}

// ******************************** //
// Styles
// ******************************** //

const HeadlineStyle = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: ${BLACK};
  margin: 0;
  padding: 0;
`

// ******************************** //
// Section Class
// ******************************** //

export const Headline = ({ children, style }: HeadlineProps) => {
  return <HeadlineStyle style={style}>{children}</HeadlineStyle>
}
