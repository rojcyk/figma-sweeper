import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Close } from "../icons/close"
import { Headline } from "../components/headline"
import { Description } from "../components/description"
import { ButtonPrimary, ButtonSecondaryStyle } from "../components/button"
import { Link } from "../components/navLink"
import DocumentContext from "../document"
import { COLORS_ROUTE, TEXTS_ROUTE } from "../../constants/routes"

// ******************** //
// Styles
// ******************** //

const ContentWrapper = styled.div`
  padding: 0 16px 16px 16px;
`

const CloseWrapper = styled.div`
  border-radius: 6px;
  transition: all 0.2s ease-out;
  cursor: pointer;
  &:hover {
    background-color: #dde3ed;
  }
`

// ******************** //
// Helpers
// ******************** //

const LoadedStylesButton = ({
  name,
  paintStyles,
  textStyles,
  deleteStyles
}: {
  name: string
  paintStyles: number
  textStyles: number
  deleteStyles: Function
}) => {
  return (
    <ButtonSecondaryStyle
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "default"
      }}
    >
      <div style={{ textAlign: "left", display: "inline-block" }}>
        <Headline style={{ fontWeight: 700, fontSize: "14px" }}>{name}</Headline>
        <Description>{paintStyles} paint styles, {textStyles} text styles </Description>
      </div>

      <CloseWrapper onClick={() => deleteStyles()}>
        <Close />
      </CloseWrapper>
    </ButtonSecondaryStyle>
  )
}

// ******************** //
// Component
// ******************** //

export default () => (
  <DocumentContext.Consumer>
    {({ isSynced, exportStyles, deleteStyles, documentName, styles }) => {
      return (
        <ContentWrapper>
          <Description style={{ marginBottom: "12px" }}>
            The plugin will export paint styles and text styles from this file and reference them later on when
            linting. If you would like lint styles in other files, you need to{" "}
            <a
              href="https://help.figma.com/hc/en-us/articles/360039162653-Publish-a-file-to-a-Team-Library"
              target="_blank"
            >
              publish
            </a>{" "}
            the file first.
          </Description>

          {isSynced ? (
            <>
              <LoadedStylesButton
                deleteStyles={deleteStyles}
                name={documentName}
                paintStyles={styles.paintStyles.length | 0}
                textStyles={styles.textStyles.length | 0}
              />

            <div style={{
              paddingTop: '12px'
            }}>
              <Link to={COLORS_ROUTE}>Uploaded Colors →</Link>
              <Link to={TEXTS_ROUTE}>Uploaded Fonts →</Link>
            </div>
            </>
          ) : (
            <ButtonPrimary onClick={() => exportStyles()} label={"Upload this document"} />
          )}

        </ContentWrapper>
      )
    }}
  </DocumentContext.Consumer>
)
