import React from "react"
import styled from "styled-components"
import io from "figmaio/ui"
import { SectionWrapper } from "../section"
import { Close } from "../close"
import { STYLES_EXPORT, STYLES_DELETE } from "../../constants/events"
import { BACKGROUND } from "../../constants/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { generateColorTable } from "./generateColorTable"
import { Headline, HeadlineStyle } from "../headline"
import { Description } from "../description"
import { Arrow } from "../arrow"
import { ButtonPrimary, ButtonSecondaryStyle } from "../buttonPrimary"

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

const ContentWrapper = styled.div`
  padding: 0 16px 16px 16px;
`

const CloseWrapper = styled.div`
  border-radius: 4px;
  transition: all 0.2s ease-out;
  &:hover {
    background-color: #dde3ed;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  // padding: 16px;
  height: 56px;
  position: relative;
`

const Tmp = ({ name, paintStyles }: { name: string; paintStyles: number }) => {
  return (
    <ButtonSecondaryStyle
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
    >
      <div style={{ textAlign: "left", display: "inline-block" }}>
        <Headline style={{ fontWeight: 600 }}>{name}</Headline>
        <Description>{paintStyles} paint styles</Description>
      </div>

      <Close
        wrapper={CloseWrapper}
        onClick={(e: any) => {
          io.send(STYLES_DELETE)
        }}
      />
    </ButtonSecondaryStyle>
  )
}

const Header = ({
  expanded,
  name,
  paintStyles,
  hasStyles,
  showArrow
}: {
  expanded: boolean
  name: string
  paintStyles: number
  hasStyles: boolean
  showArrow: boolean
}) => {
  const arrowDirection = expanded ? "down" : "right"
  return (
    <ButtonWrapper style={{ cursor: showArrow ? "pointer" : "default" }}>
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

const Content = ({
  name,
  paintStyles,
  isSynced
}: {
  name: string
  paintStyles: number
  isSynced: boolean
}) => {
  return (
    <ContentWrapper>
      <Description style={{ marginBottom: "12px", marginTop: "4px" }}>
        The plugin will export the styles from the file and reference them later on when linting. If
        you would like to use it in other files, you need to{" "}
        <a
          href="https://help.figma.com/hc/en-us/articles/360039162653-Publish-a-file-to-a-Team-Library"
          target="_blank"
        >
          publish
        </a>{" "}
        the file first.
      </Description>

      {isSynced === false && (
        <ButtonPrimary
          onClick={(e: any) => {
            console.log("exporting")
            io.send(STYLES_EXPORT)
          }}
          label={"Upload this document"}
        />
      )}
      {isSynced === true && <Tmp name={name} paintStyles={paintStyles | 0} />}
    </ContentWrapper>
  )
}

export const ThemeOverview = ({ styles, name }: Plugin.ThemeOverviewI) => {
  // const paintStyles = generateColorTable(styles.paintStyles)
  const [expanded, setExpanded] = React.useState(false)
  const hasStyles = styles.paintStyles?.length > 0 ? true : false
  const isSynced = name !== ""

  // if (hasStyles === false) setExpanded(true)

  const toggleHandler = () => {
    if (expanded) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  return (
    <SectionWrapper
      expanded={isSynced ? expanded : true}
      content={<Content name={name} paintStyles={styles.paintStyles.length} isSynced={isSynced} />}
      button={
        <Header
          expanded={isSynced ? expanded : true}
          showArrow={isSynced ? true : false}
          name={name}
          paintStyles={styles.paintStyles.length}
          hasStyles={hasStyles}
        />
      }
      buttonHandler={toggleHandler}
    />
  )
}
