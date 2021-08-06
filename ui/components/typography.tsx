import React from "react"
import styled, { css } from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import {
  FS_DEFAULT,
  FS_LARGE,
  FS_SMALL,
  BLACK,
  BLUE,
  GRAY
} from "@ui"

export const HeadlineStyle = css`
  display: block;
  font-weight: 800;
  color: ${BLACK};
  margin:0;
  padding: 0;
`

export const H1 = styled.h1`
  ${HeadlineStyle}
  font-size: ${FS_LARGE};
`

export const H2 = styled.h2`
  ${HeadlineStyle}
  font-size: ${FS_DEFAULT};
`

export const H3 = styled.h3`
  ${HeadlineStyle}
  font-size: ${FS_SMALL};
`



// ******************** //
// Styles
// ******************** //

export const P = styled.p`
  font-size: ${FS_SMALL};
  line-height: 130%;
  font-weight: 400;
  color: ${GRAY};
  margin: 0;
  padding: 0;

  a {
    color: ${BLUE};
    font-weight: 500;
  }
`
