import React from "react"
import styled from "styled-components"

import { Headline } from "../components/headline"
import { Arrow } from "../icons/arrow"
import { BACKGROUND, WHITE } from "../../constants/ui"

const HeaderWrapper = styled.div<{ isSynced: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 16px;

  ${({ isSynced }) =>
    isSynced
      ? `
      background-color: ${WHITE};
    `
      : `
      svg,
      span {
        color: #8593A3 !important;
      }

      text-shadow: 0 1px 0 ${WHITE};

      // box-shadow: inset 0 1px 0 ${WHITE};
      background-color: ${BACKGROUND};
    `}
`

export default ({
  isExpanded,
  isActive,
  label
}: {
  isExpanded: boolean
  isActive: boolean
  label: string
}) => {
  return (
    <HeaderWrapper isSynced={isActive}>
      <Arrow
        direction={isExpanded ? "down" : "right"}
        style={{ opacity: isActive ? "1" : "0.25" }}
      />
      <Headline>{label}</Headline>
    </HeaderWrapper>
  )
}
