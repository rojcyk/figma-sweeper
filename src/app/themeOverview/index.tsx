import React from "react"
import styled from "styled-components"
import io from "figmaio/ui"
import { SectionWrapper } from "../section"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { generateColorTable } from "./generateColorTable"
import { Headline, HeadlineStyle } from "../headline"
import { Description } from "../description"
import { Arrow } from "../arrow"
import { ButtonPrimary } from "../buttonPrimary"

const HeadlineAnimated = styled(HeadlineStyle)<{
  expanded: boolean
}>`
  transition: all 0.2s ease-out;
  position: absolute;
  top: ${({ expanded }) => (expanded ? "18px" : "0")};
  left: 30px;
  opacity: ${({ expanded }) => (expanded ? "1" : "0")};
`

const LoadedStyle = styled.div<{
  expanded: boolean
}>`
  transition: all 0.2s ease-out;
  position: absolute;
  top: ${({ expanded }) => (expanded ? "24px" : "10px")};
  left: 30px;
  opacity: ${({ expanded }) => (expanded ? "0" : "1")};
`

const ContentWrapper = styled.div`
  padding: 0 16px 16px 16px;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  // padding: 16px;
  height: 56px;
  position: relative;
`

const Header = ({
  expanded,
  name,
  paintStyles,
  hasStyles
}: {
  expanded: boolean
  name: string
  paintStyles: number
  hasStyles: boolean
}) => {
  const arrowDirection = expanded ? "down" : "right"
  return (
    <ButtonWrapper>
      <Arrow direction={arrowDirection} style={{ opacity: hasStyles ? "1" : "0.5" }} />
      <HeadlineAnimated expanded={expanded}>Sync styles</HeadlineAnimated>
      <LoadedStyle expanded={expanded}>
        <Headline>{name}</Headline>
        <Description>{paintStyles} paint styles</Description>
      </LoadedStyle>
    </ButtonWrapper>
  )
}

const Content = ({
  name,
  paintStyles,
  hasStyles
}: {
  name: string
  paintStyles: number
  hasStyles: boolean
}) => {
  return (
    <ContentWrapper>
      <Description style={{ marginBottom: "12px", marginTop: "4px" }}>
        The plugin will export the styles from the file, and reference them later on when linting.
        If you would like to use it in other files, you need to{" "}
        <a
          href="https://help.figma.com/hc/en-us/articles/360039162653-Publish-a-file-to-a-Team-Library"
          target="_blank"
        >
          publish
        </a>{" "}
        the library first.
      </Description>

      {hasStyles === false && <ButtonPrimary>Upload this document</ButtonPrimary>}
      {hasStyles === true && <ButtonPrimary>Unsync document</ButtonPrimary>}
    </ContentWrapper>
  )
}

export const ThemeOverview = ({ styles, name }: Plugin.ThemeOverviewI) => {
  const paintStyles = generateColorTable(styles.paintStyles)
  const [expanded, setExpanded] = React.useState(false)
  const hasStyles = styles.paintStyles.length > 0 ? true : false

  if (hasStyles === false) setExpanded(true)

  const toggleHandler = () => {
    if (expanded) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  return (
    <SectionWrapper
      expanded={expanded}
      content={
        <Content name={name} paintStyles={styles.paintStyles.length} hasStyles={hasStyles} />
      }
      button={
        <Header
          expanded={expanded}
          name={name}
          paintStyles={styles.paintStyles.length}
          hasStyles={hasStyles}
        />
      }
      buttonHandler={toggleHandler}
    />
  )
}
