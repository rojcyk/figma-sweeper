import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Headline } from "../components/headline"
import { Arrow } from "../icons/arrow"
import { BACKGROUND, WHITE, ANIMATION_SPEED_MS } from "../../constants/ui"

// ******************** //
// Helpers
// ******************** //

const HeaderWrapper = styled.div<{ isActive: boolean }>`
  position: relative;
  height: 56px;

  ${({ isActive }) =>
    isActive
      ? `
      cursor: pointer;

      .background {
        background-color: ${WHITE};
      }

      &:hover {
        .background {
          background-color: ${BACKGROUND};
        }
      }
      `
      : `
      cursor: default;
  `}
`

export const HeaderBackground = styled.div<{ isExpanded: boolean }>`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;

  ${({ isExpanded }) =>
    isExpanded
      ? `
      border-radius: 16px;
      border-top: 12px solid ${WHITE};
      border-bottom: 12px solid ${WHITE};
      border-left: 6px solid ${WHITE};
      border-right: 6px solid ${WHITE};
    `
      : `
      border: 0 solid ${WHITE};
      border-radius: 0;
  `}
`

const LabelWrapper = styled.div<{ isActive: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 16px 16px;

  ${({ isActive }) =>
    isActive
      ? `
    `
      : `
      svg,
      span {
        color: #8593A3 !important;
      }

      text-shadow: 0 1px 0 ${WHITE};
    `}
`

// ******************** //
// Component
// ******************** //

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
    <HeaderWrapper isActive={isActive}>
      <LabelWrapper isActive={isActive}>
        <Arrow
          direction={isExpanded ? "down" : "right"}
          style={{
            position: "relative",
            opacity: isActive ? "1" : "0.25",
            zIndex: 10
          }}
        />
        <Headline style={{ zIndex: 10, position: "relative" }}>{label}</Headline>
      </LabelWrapper>
      <HeaderBackground className="background" isExpanded={isExpanded} />
    </HeaderWrapper>
  )
}
