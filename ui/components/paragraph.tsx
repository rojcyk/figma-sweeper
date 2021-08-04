import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { BLUE, FS_SMALL, GRAY } from "@ui"

// ******************** //
// Styles
// ******************** //

export const ParagraphStyle = styled.p`
  font-size: ${FS_SMALL};
  line-height: 130%;
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

export const P = (props: any) => <ParagraphStyle {...props} />
