import io from "figmaio/ui"
import React from "react"
import styled from "styled-components"

import { SectionWrapper } from "../components/section"
import { Headline } from "../components/headline"
import { Arrow } from "../icons/arrow"
import { Description } from "../components/description"
import { Check } from "../components/check"
import { COLOR_SETTINGS_CHANGE } from "../../constants/events"
import { BACKGROUND, WHITE } from "../../constants/ui"

interface ColorSettingsProp {
  settings: Plugin.ColorSettings
  isSynced: boolean
  expanded: boolean
}

interface ColorSettingsState {
  expanded: boolean
  settings: Plugin.ColorSettings
}

const HeaderWrapper = styled.div<{ isSynced: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 16px;

  ${({ isSynced }) =>
    isSynced
      ? `
      background-color: ${WHITE};
    `
      : `
      svg,
      span {
        color: #8593A3 !important;
      }

      box-shadow: inset 0 1px 0 ${WHITE};
      background-color: ${BACKGROUND};
    `}
`

const ContentWrapper = styled.div`
  padding: 0 16px;
`

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f2f4f7;
  }
`

const CheckboxLabel = styled.span<{
  checked: boolean
}>`
  font-size: 13px;
  color: ${({ checked }) => (checked ? "#000000" : "#6F737D")};
  font-weight: 500;
`

const Checkbox = ({
  checked,
  children,
  onCheckboxChange
}: {
  checked: boolean
  children: any
  onCheckboxChange: Function
}) => {
  return (
    <CheckboxWrapper onClick={() => onCheckboxChange()}>
      <Check checked={checked} />
      <CheckboxLabel checked={checked} style={{ display: "inline-block" }}>
        {children}
      </CheckboxLabel>
    </CheckboxWrapper>
  )
}

const Header = ({ expanded, isSynced }: { expanded: boolean; isSynced: boolean }) => {
  return (
    <HeaderWrapper isSynced={isSynced}>
      <Arrow direction={expanded ? "down" : "right"} style={{ opacity: isSynced ? "1" : "0.25" }} />
      <Headline>Colors</Headline>
    </HeaderWrapper>
  )
}

const Content = ({
  expanded,
  onSettingsChange,
  settings
}: {
  expanded: boolean
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
        button={<Header expanded={this.state.expanded} isSynced={this.props.isSynced} />}
        content={
          <Content
            settings={this.state.settings}
            expanded={this.state.expanded}
            onSettingsChange={this.toggleSettings.bind(this)}
          />
        }
        buttonHandler={this.toggleHandler}
      />
    )
  }
}

export default SettingsForm
