import * as React from "react"
import styled from "styled-components"

import { GRAY, BLACK, BACKGROUND, SEPARATOR } from "../constants/ui"

// ******************** //
// UI
// ******************** //

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${BACKGROUND};
  width: 100%;
  padding: 8px;
  // border-top: 1px solid ${SEPARATOR};

  a,
  span {
    color: ${GRAY};
    opacity: 0.8;
  }

  a {
    color: ${GRAY};

    &:hover {
      color: ${BLACK};
    }
  }
`

const Spacer = styled.span`
  margin-left: 4px;
  margin-right: 4px;
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <a target="_blank" href="https://github.com/rojcyk/figma-reconnect/issues">
        Report bugs
      </a>
      <Spacer>•</Spacer>
      <a target="_blank" href="https://github.com/sponsors/rojcyk">
        Support project
      </a>
    </FooterWrapper>
  )
}
