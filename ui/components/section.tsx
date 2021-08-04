import React from "react"
import styled from "styled-components"
import AnimateHeight from "react-animate-height"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Arrow } from '@icons/arrow'
import {
  WHITE,
  BACKGROUND_LIGHT,
  SEPARATOR,
  ANIMATION_SPEED_MS,
  BORDER_RADIUS_M
} from "@ui"

export const SectionWrapper = styled.div<{ expanded: boolean }>`
  background-color: ${WHITE};
  transition: all ${ANIMATION_SPEED_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
  border-top: ${({ expanded }) => expanded ? `3px solid ${SEPARATOR}` : `1px solid rgba(255,255,255,0)`};
  border-bottom: ${({ expanded }) => expanded ? `4px solid ${SEPARATOR}` : `1px solid ${SEPARATOR}`};
`

// ******************** //
// Helpers
// ******************** //

const SectionHeaderLabel = styled.span`
  z-index: 10;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
`

const SectionHeaderBackground = styled.div<{ expanded: boolean }>`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;

  ${({ expanded }) =>
    expanded
      ? `
      border: 6px solid ${WHITE};
      border-radius: ${6 + BORDER_RADIUS_M}px;
    `
      : `
      border: 0 solid ${WHITE};
      border-radius: 0;
  `}
`

const SectionHeaderWrapper = styled.div`
  position: relative;
  height: 56px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 16px 16px;

  ${SectionHeaderBackground} {
    background-color: ${WHITE};
  }

  &:hover {
    ${SectionHeaderBackground} {
      background-color: ${BACKGROUND_LIGHT};
    }
  }
`

// ******************** //
// Component
// ******************** //

interface SectionHeaderProps {
  expanded: boolean
  children: any
  onClick: Function
}

export const SectionHeader = ({ expanded, children, onClick }: SectionHeaderProps) => {
  return (
    <SectionHeaderWrapper onClick={() => onClick()}>
      <Arrow
        direction={expanded ? "down" : "right"}
        style={{ position: "relative", zIndex: 10 }}
      />
      <SectionHeaderLabel>{children}</SectionHeaderLabel>

      <SectionHeaderBackground expanded={expanded}/>
    </SectionHeaderWrapper>
  )
}


// ******************** //
// Interface
// ******************** //

interface SectionContentProps {
  expanded: boolean
  children: any
  style?: React.CSSProperties
}

export const SectionContent = ({ children, expanded, style }: SectionContentProps) => {
  const height = expanded ? "auto" : 0

  return (
    <AnimateHeight
      style={style}
      duration={ANIMATION_SPEED_MS}
      height={height}>
      {children}
    </AnimateHeight>
  )
}