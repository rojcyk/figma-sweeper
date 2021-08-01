import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Headline } from "./headline"
import { Arrow } from "../icons/arrow"
import { BACKGROUND, WHITE, ANIMATION_SPEED_MS } from "../../constants/ui"

// ******************** //
// Helpers
// ******************** //

const HeaderLabel = styled.span`
  z-index: 10;
  position: "relative";
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
`

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
      border: 8px solid ${WHITE};
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

interface HeaderProps {
  isExpanded: boolean
  isActive: boolean
  label: string
}

export class Header extends React.Component<HeaderProps, {}> {
  public render(): React.ReactNode {
    return (
      <HeaderWrapper isActive={this.props.isActive}>
        <LabelWrapper isActive={this.props.isActive}>
          <Arrow
            direction={this.props.isExpanded ? "down" : "right"}
            style={{
              position: "relative",
              opacity: this.props.isActive ? "1" : "0.25",
              zIndex: 10
            }}
          />
          <HeaderLabel>{this.props.label}</HeaderLabel>
        </LabelWrapper>
        <HeaderBackground className="background" isExpanded={this.props.isExpanded} />
      </HeaderWrapper>
    )
  }
}

export default Header