import io from "figmaio/ui"
import React from "react"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { SectionWrapper } from "../components/section"
import { TEXT_SETTINGS_CHANGE } from "../../constants/events"
import SectionHeader from "../components/sectionHeader"
import FontsContent from "./fontsContent"

// ******************** //
// Types
// ******************** //

interface TextSettingsProp {
  settings: Plugin.TextSettings
  isSynced: boolean
  expanded: boolean
  toggleHandler: Function
}

interface TextSettingsState {
  settings: Plugin.TextSettings
}

// ******************** //
// COMPONENT
// ******************** //

export class SettingsForm extends React.Component<TextSettingsProp, TextSettingsState> {
  public constructor(props: TextSettingsProp) {
    super(props)

    this.state = {
      settings: props.settings
    }
  }

  public toggleSettings(settingsProp: Plugin.TextSettingsProp) {
    /* We get the current settings */
    let tmpSettings = this.state.settings
    /* We then toggle the desired property */
    tmpSettings[settingsProp] = !tmpSettings[settingsProp]
    /* We set it for the state, so the UI can be updated */
    this.setState({ settings: tmpSettings })
    /* And we also send it over to Figma, so we can store the settings */
    io.send(TEXT_SETTINGS_CHANGE, tmpSettings)
  }

  public render() {
    const expanded = this.props.isSynced ? this.props.expanded : false
    return (
      <SectionWrapper
        isActive={this.props.isSynced}
        expanded={expanded}
        header={
          <SectionHeader label={"Fonts"} isExpanded={expanded} isActive={this.props.isSynced} />
        }
        content={
          <FontsContent
            settings={this.state.settings}
            onSettingsChange={this.toggleSettings.bind(this)}
          />
        }
        toggleHandler={() => this.props.toggleHandler("fonts")}
      />
    )
  }
}

// ******************** //
// EXPORT
// ******************** //

export default SettingsForm
