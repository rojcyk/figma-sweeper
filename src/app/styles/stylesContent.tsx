import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Close } from "../icons/close"
import { Headline } from "../components/headline"
import { Description } from "../components/description"
import { ButtonPrimary, ButtonSecondaryStyle } from "../components/button"

// ******************** //
// Styles
// ******************** //

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

// ******************** //
// Helpers
// ******************** //

const LoadedStylesButton = ({
  name,
  paintStyles,
  deleteStyles
}: {
  name: string
  paintStyles: number
  deleteStyles: Function
}) => {
  return (
    <ButtonSecondaryStyle
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
    >
      <div style={{ textAlign: "left", display: "inline-block" }}>
        <Headline style={{ fontWeight: 700, fontSize: "14px" }}>{name}</Headline>
        <Description>{paintStyles} paint styles</Description>
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

export default ({
  name,
  paintStyles,
  isSynced,
  exportStyles,
  deleteStyles
}: {
  name: string
  paintStyles: number
  isSynced: boolean
  exportStyles: Function
  deleteStyles: Function
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

      {isSynced ? (
        <LoadedStylesButton deleteStyles={deleteStyles} name={name} paintStyles={paintStyles | 0} />
      ) : (
        <ButtonPrimary onClick={() => exportStyles()} label={"Upload this document"} />
      )}
    </ContentWrapper>
  )
}
