import io from "figmaio/ui"
import React from "react"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { SectionWrapper } from "../components/section"
import { COLOR_SETTINGS_CHANGE } from "../../constants/events"
import SectionHeader from "../components/sectionHeader"
import ColorsContent from "./colorsContent"

// ******************** //
// Types
// ******************** //

interface ColorSettingsProp {
  settings: Plugin.ColorSettings
  isSynced: boolean
  expanded: boolean
  toggleHandler: Function
}

// ******************** //
// COMPONENT
// ******************** //

export class SettingsForm extends React.Component<ColorSettingsProp> {
  public toggleSettings(settingsProp: Plugin.ColorSettingsProp) {
    /* We get the current settings */
    let tmpSettings = this.props.settings
    /* We then toggle the desired property */
    tmpSettings[settingsProp] = !tmpSettings[settingsProp]
    /* And we also send it over to Figma, so we can store the settings */
    io.send(COLOR_SETTINGS_CHANGE, tmpSettings)
  }

  public render() {
    const expanded = this.props.isSynced ? this.props.expanded : false
    return (
      <SectionWrapper
        isActive={this.props.isSynced}
        expanded={expanded}
        header={
          <SectionHeader label={"Colors"} isExpanded={expanded} isActive={this.props.isSynced} />
        }
        content={
          <ColorsContent
            settings={this.props.settings}
            onSettingsChange={this.toggleSettings.bind(this)}
          />
        }
        toggleHandler={() => this.props.toggleHandler("colors")}
      />
    )
  }
}

// ******************** //
// EXPORT
// ******************** //

export default SettingsForm
