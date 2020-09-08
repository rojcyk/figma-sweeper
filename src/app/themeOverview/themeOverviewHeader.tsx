import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Headline, HeadlineStyle } from "../components/headline"
import { Description } from "../components/description"
import { Arrow } from "../icons/arrow"

const HeadlineAnimated = styled(HeadlineStyle)<{
  expanded: boolean
}>`
  user-select: none;
  transition: all 0.2s ease-out;
  position: absolute;
  top: ${({ expanded }) => (expanded ? "19px" : "0")};
  left: 32px;
  opacity: ${({ expanded }) => (expanded ? "1" : "0")};
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  height: 56px;
  position: relative;
`

const LoadedStyle = styled.div<{
  expanded: boolean
}>`
  user-select: none;
  transition: all 0.2s ease-out;
  position: absolute;
  top: ${({ expanded }) => (expanded ? "24px" : "10px")};
  left: 30px;
  opacity: ${({ expanded }) => (expanded ? "0" : "1")};
`

export default ({
  expanded,
  name,
  paintStyles,
  isSynced,
  showArrow
}: {
  expanded: boolean
  name: string
  paintStyles: number
  isSynced: boolean
  showArrow: boolean
}) => {
  const arrowDirection = expanded ? "down" : "right"
  return (
    <ButtonWrapper
      style={{
        cursor: showArrow ? "pointer" : "default",
        pointerEvents: isSynced ? "none" : "auto"
      }}
    >
      <Arrow direction={arrowDirection} style={{ opacity: showArrow ? "1" : "0.25" }} />

      {name === "" ? (
        <Headline>Sync styles</Headline>
      ) : (
        <React.Fragment>
          <HeadlineAnimated expanded={expanded}>Sync styles</HeadlineAnimated>
          <LoadedStyle expanded={expanded}>
            <Headline>{name}</Headline>
            <Description>{paintStyles} paint styles</Description>
          </LoadedStyle>
        </React.Fragment>
      )}
    </ButtonWrapper>
  )
}
