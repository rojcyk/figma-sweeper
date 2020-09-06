import React from "react"
import styled from "styled-components"

import { GRAY } from "../constants/ui"

// ******************************** //
// Interface
// ******************************** //

export interface DescriptionProps {
  children: any
}

// ******************************** //
// Styles
// ******************************** //

const DescriptionStyle = styled.p`
  display: block;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  color: ${GRAY};
  margin: 0;
  padding: 0;
`

// ******************************** //
// Section Class
// ******************************** //

export const Description = ({ children }: DescriptionProps) => {
  return <DescriptionStyle>{children}</DescriptionStyle>
}
