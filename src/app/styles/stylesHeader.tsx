import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Headline, HeadlineStyle } from "../components/headline"
import { Description } from "../components/description"
import { Arrow } from "../icons/arrow"
import { ANIMATION_SPEED_MS, BACKGROUND, WHITE } from "../../constants/ui"
import { HeaderBackground } from "../components/sectionHeader"
import DocumentContext from "../document"

// ******************** //
// Styles
// ******************** //

const ButtonWrapper = styled.div<{
  isSynced: boolean
}>`
  display: flex;
  align-items: center;
  padding-left: 16px;
  height: 56px;
  position: relative;

  ${({ isSynced }) =>
    isSynced
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

const HeadlineAnimated = styled(HeadlineStyle)<{
  expanded: boolean
}>`
  z-index: 10;
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;
  position: absolute;
  top: ${({ expanded }) => (expanded ? "19px" : "0")};
  left: 32px;
  opacity: ${({ expanded }) => (expanded ? "1" : "0")};
`

const LoadedStyle = styled.div<{
  expanded: boolean
}>`
  z-index: 10;
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;
  position: absolute;
  top: ${({ expanded }) => (expanded ? "24px" : "10px")};
  left: 30px;
  opacity: ${({ expanded }) => (expanded ? "0" : "1")};
`

// ******************** //
// Components
// ******************** //

export default ({ expanded, showArrow }: { expanded: boolean; showArrow: boolean }) => {
  return (
    <DocumentContext.Consumer>
      {({ isSynced, documentName, styles }) => {
        return (
          <ButtonWrapper isSynced={isSynced}>
            <Arrow
              direction={expanded ? "down" : "right"}
              style={{ opacity: showArrow ? "1" : "0.25", zIndex: 10 }}
            />

            {documentName === "" ? (
              <Headline>Sync styles</Headline>
            ) : (
              <React.Fragment>
                <HeadlineAnimated expanded={expanded}>Sync styles</HeadlineAnimated>
                <LoadedStyle expanded={expanded}>
                  <Headline>{documentName}</Headline>
                  <Description>{styles.paintStyles.length} paint styles</Description>
                </LoadedStyle>
              </React.Fragment>
            )}

            <HeaderBackground className={"background"} isExpanded={expanded} />
          </ButtonWrapper>
        )
      }}
    </DocumentContext.Consumer>
  )
}
