import io from "figmaio/ui"
import React from "react"
import styled from "styled-components"

import { SectionWrapper } from "../components/section"
import { COLOR_SETTINGS_CHANGE } from "../../constants/events"
import SectionHeader from "../components/sectionHeader"
import ColorsContent from "./colorsContent"

interface ColorSettingsProp {
  settings: Plugin.ColorSettings
  isSynced: boolean
  expanded: boolean
}

interface ColorSettingsState {
  expanded: boolean
  settings: Plugin.ColorSettings
}

// ******************** //
// COMPONENT
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
    const expanded = this.props.isSynced ? this.state.expanded : false
    return (
      <SectionWrapper
        isActive={this.props.isSynced}
        expanded={expanded}
        button={
          <SectionHeader label={"Colors"} isExpanded={expanded} isActive={this.props.isSynced} />
        }
        content={
          <ColorsContent
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
