import React from "react"
import styled from "styled-components"
import io from "figmaio/ui"
import { SectionWrapper } from "../section"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { generateColorTable } from "./generateColorTable"
import { Headline } from "../headline"
import { Description } from "../description"
import { Arrow } from "../arrow"
import { ButtonPrimary } from "../buttonPrimary"

const ContentWrapper = styled.div`
  padding: 0 16px 16px 16px;
`

const ButtonWrapper = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
`

const Header = ({ expanded }: { expanded: boolean }) => {
  return (
    <ButtonWrapper>
      <Arrow expanded={expanded} />
      <Headline>Colors</Headline>
    </ButtonWrapper>
  )
}

const Content = () => {
  return (
    <ContentWrapper>
      <Description style={{ marginBottom: "12px", marginTop: "4px" }}>
        The plugin will export the styles from the file, and reference them later on when linting.
      </Description>

      <ButtonPrimary>Sync document</ButtonPrimary>
    </ContentWrapper>
  )
}

export const ThemeOverview = ({ styles, name }: Plugin.ThemeOverviewI) => {
  const paintStyles = generateColorTable(styles.paintStyles)
  const [expanded, setExpanded] = React.useState(false)

  const toggleHandler = () => {
    if (expanded) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  return (
    <React.Fragment>
      <SectionWrapper
        expanded={expanded}
        content={Content}
        button={Header}
        buttonHandler={toggleHandler}
      />
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          marginBottom: "16px"
        }}
      >
        <h2
          style={{
            display: "inline-block",
            margin: "0",
            padding: "0"
          }}
        >
          Sync
        </h2>

        <button
          onClick={(e: any) => {
            io.send(STYLES_EXPORT)
          }}
        >
          Current doc
        </button>
      </div>

      <p
        style={{
          lineHeight: "18px",
          opacity: "0.8"
        }}
      >
        The plugin will look into this file and search for your paint styles. The file must be{" "}
        <a
          href="https://help.figma.com/hc/en-us/articles/360039162653-Publish-a-file-to-a-Team-Library"
          target="_blank"
        >
          published
        </a>
        .
      </p>

      <div style={{ marginBottom: "4px" }}>
        <b>
          <strong style={{ fontSize: "9px", opacity: "0.3" }}>►</strong> Synced document:
        </b>{" "}
        {name && <span style={{ marginRight: "4px" }}>{name}</span>}
      </div>
      <details
        style={{
          marginBottom: "12px"
        }}
      >
        <summary
          style={{
            marginBottom: "8px",
            fontSize: "12px",
            outline: "none",
            cursor: "pointer"
          }}
        >
          <b>Synced colors:</b> {styles.paintStyles ? styles.paintStyles.length : ""}
        </summary>

        <p
          style={{
            fontSize: "12px",
            lineHeight: "18px",
            opacity: "0.5",
            padding: "8px",
            border: "1px solid rgba(0,0,0,0.14)",
            borderRadius: "3px"
          }}
        >
          For now, the plugin works with color styles that have a <b>single and solid</b> fill.
        </p>

        {paintStyles}
      </details> */}
    </React.Fragment>
  )
}
