import React from "react"
import styled from "styled-components"

import { Description } from "../components/description"
import Checkbox from "../components/checkbox"

const ContentWrapper = styled.div`
  padding: 0 16px;
`

export const Content = ({
  onSettingsChange,
  settings
}: {
  onSettingsChange: Function
  settings: Plugin.ColorSettings
}) => {
  return (
    <ContentWrapper>
      <Description style={{ paddingBottom: "16px" }}>
        The plugin will export the styles from this file, and reference them later on when linting.
      </Description>

      <Checkbox
        checked={settings.overwriteFills}
        onCheckboxChange={() => {
          onSettingsChange("overwriteFills")
        }}
      >
        Overwrite Fills
      </Checkbox>
      <Checkbox
        checked={settings.overwriteStrokes}
        onCheckboxChange={() => {
          onSettingsChange("overwriteStrokes")
        }}
      >
        Overwrite Strokes
      </Checkbox>
      <Checkbox
        checked={settings.overwriteStyles}
        onCheckboxChange={() => {
          onSettingsChange("overwriteStyles")
        }}
      >
        Overwrite already set styles
      </Checkbox>
      <Checkbox
        checked={settings.ignoreOpacity}
        onCheckboxChange={() => {
          onSettingsChange("ignoreOpacity")
        }}
      >
        Ignore opacity
      </Checkbox>
      <Checkbox
        checked={settings.findClosestColor}
        onCheckboxChange={() => {
          onSettingsChange("findClosestColor")
        }}
      >
        Assign closest color
      </Checkbox>
      <br />
    </ContentWrapper>
  )
}

export default Content
