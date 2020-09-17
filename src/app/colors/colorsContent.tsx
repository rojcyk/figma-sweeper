import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Description } from "../components/description"
import Checkbox from "../components/checkbox"

// ******************** //
// TOP LVL STYLING
// ******************** //

const ContentWrapper = styled.div`
  padding: 0 16px;
`

// ******************** //
// COMPONENT
// ******************** //

export const Content = ({
  onSettingsChange,
  settings
}: {
  onSettingsChange: Function
  settings: Plugin.ColorSettings
}) => {
  return (
    <ContentWrapper>
      <Description style={{ paddingBottom: "16px", paddingTop: "0" }}>
        When linting, the plugin will go through all the elements, and match their colors to the
        uploaded styles.
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

// ******************** //
// EXPORT
// ******************** //

export default Content
