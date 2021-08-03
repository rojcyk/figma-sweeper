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
  settings: Plugin.TextSettings
}) => {
  return (
    <ContentWrapper>
      <Description style={{ paddingBottom: "16px", paddingTop: "0" }}>
        For now, the plugin is looking for direct matches. It considers font family, font size and font style. Turn everything ON to skip font linting.
      </Description>

      <Checkbox
        checked={settings.ignoreFamilies}
        onCheckboxChange={() => {
          onSettingsChange("ignoreFamilies")
        }}
      >
        Ignore font family
      </Checkbox>
      <Checkbox
        checked={settings.ignoreStyle}
        onCheckboxChange={() => {
          onSettingsChange("ignoreStyle")
        }}
      >
        Ignore font style
      </Checkbox>
      <Checkbox
        checked={settings.ignoreHeight}
        onCheckboxChange={() => {
          onSettingsChange("ignoreHeight")
        }}
      >
        Ignore font height
      </Checkbox>
      <br />
    </ContentWrapper>
  )
}

// ******************** //
// EXPORT
// ******************** //

export default Content
