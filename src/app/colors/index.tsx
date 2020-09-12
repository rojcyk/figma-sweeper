import io from "figmaio/ui"
import React from "react"
import styled from "styled-components"

import { SectionWrapper } from "../components/section"
import { Description } from "../components/description"
import Checkbox from "../components/checkbox"
import { COLOR_SETTINGS_CHANGE } from "../../constants/events"
import SectionHeader from "../components/sectionHeader"

interface ColorSettingsProp {
  settings: Plugin.ColorSettings
  isSynced: boolean
  expanded: boolean
}

interface ColorSettingsState {
  expanded: boolean
  settings: Plugin.ColorSettings
}

const ContentWrapper = styled.div`
  padding: 0 16px;
`

const Content = ({
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
        Ignore opacity
      </Checkbox>
      <Checkbox
        checked={settings.ignoreOpacity}
        onCheckboxChange={() => {
          onSettingsChange("ignoreOpacity")
        }}
      >
        Overwrite already set styles
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
// LOCAL INCLUDES
// ******************** //

export class SettingsForm extends React.Component<ColorSettingsProp, ColorSettingsState> {
  public constructor(props: ColorSettingsProp) {
    super(props)

    this.state = {
      expanded: props.expanded,
      settings: props.settings
    }
  }

  public toggleSettings(settingsProp: Plugin.ColorSettingsProp) {
    /* We get the current settings */
    let tmpSettings = this.state.settings
    /* We then toggle the desired property */
    tmpSettings[settingsProp] = !tmpSettings[settingsProp]
    /* We set it for the state, so the UI can be updated */
    this.setState({ settings: tmpSettings })
    /* And we also send it over to Figma, so we can store the settings */
    io.send(COLOR_SETTINGS_CHANGE, tmpSettings)
  }

  public toggleHandler = () => {
    if (this.state.expanded) {
      this.setState({
        expanded: false
      })
    } else {
      this.setState({
        expanded: true
      })
    }
  }

  public render() {
    return (
      <SectionWrapper
        isSynced={this.props.isSynced}
        expanded={this.props.isSynced ? this.state.expanded : false}
        button={
          <SectionHeader
            label={"Colors"}
            isExpanded={this.state.expanded}
            isActive={this.props.isSynced}
          />
        }
        content={
          <Content
            settings={this.state.settings}
            onSettingsChange={this.toggleSettings.bind(this)}
          />
        }
        buttonHandler={this.toggleHandler}
      />
    )
  }
}

export default SettingsForm
