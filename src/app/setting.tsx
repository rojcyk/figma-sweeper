import * as React from "react"
import Checkbox from "./checkbox"
import io from "figmaio/ui"
import { APP_LINT, COLOR_SETTINGS_CHANGE } from "../constants/events"

interface ColorSettingsProp {
  currentSettings: Plugin.ColorSettings
}

interface ColorSettingsState {
  opened: boolean
  settings: Plugin.ColorSettings
}

export class SettingsForm extends React.Component<ColorSettingsProp, ColorSettingsState> {
  public constructor(props: ColorSettingsProp) {
    super(props)

    this.state = {
      opened: false,
      settings: props.currentSettings
    }
  }

  private toggleSettings(settingsProp: Plugin.ColorSettingsProp) {
    /* We get the current settings */
    let tmpSettings = this.state.settings
    /* We then toggle the desired property */
    tmpSettings[settingsProp] = !tmpSettings[settingsProp]
    /* We set it for the state, so the UI can be updated */
    this.setState({ settings: tmpSettings })
    /* And we also send it over to Figma, so we can store the settings */
    io.send(COLOR_SETTINGS_CHANGE, tmpSettings)
  }

  public render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const settings = {}
          io.send(APP_LINT, settings)
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            marginBottom: "16px"
          }}
        >
          <h2
            style={{
              display: "inline-block",
              margin: "0",
              padding: "0"
            }}
          >
            Settings
          </h2>
          <input type="submit" value="ReConnect" />
        </div>
        <p
          style={{
            lineHeight: "18px",
            opacity: "0.8",
            fontSize: "12px"
          }}
        >
          Make sure to{" "}
          <a
            href="https://help.figma.com/hc/en-us/articles/360038006754-Version-History#:~:text=Figma%20will%20periodically%20save%20versions,even%20more%20space%20to%20explore."
            target="blank"
          >
            make a new version
          </a>{" "}
          prior to reconnecting. It isn't required, but it might save you some headaches. The plugin
          will check and overwrite the following properties.
        </p>

        <Checkbox
          label="Overwrite fills"
          isSelected={this.state.settings.overwriteFills}
          onCheckboxChange={() => {
            this.toggleSettings("overwriteFills")
          }}
        />

        <Checkbox
          label="Overwrite strokes"
          isSelected={this.state.settings.overwriteStrokes}
          onCheckboxChange={() => {
            this.toggleSettings("overwriteStrokes")
          }}
        />

        <Checkbox
          label="Overwrite styles"
          isSelected={this.state.settings.overwriteStyles}
          onCheckboxChange={() => {
            this.toggleSettings("overwriteStyles")
          }}
        />

        <Checkbox
          label="Ignore opacity"
          isSelected={this.state.settings.ignoreOpacity}
          onCheckboxChange={() => {
            this.toggleSettings("ignoreOpacity")
          }}
        />

        <Checkbox
          label="Find closest color"
          isSelected={this.state.settings.findClosestColor}
          onCheckboxChange={() => {
            this.toggleSettings("findClosestColor")
          }}
        />

        <br />
        <label>Compare engine</label>
        <br />
        {/* <select name="compareEngine" onChange={onChangeHandler}>
          <option value="EUclidean Distance">Euclidean Distance</option>
          <option value="deltae">DeltaE</option>
        </select> */}
        <br />
        <br />
        <hr />
        <br />
        <b>Not implemented</b>
        <br />
        <br />
        <p>
          Maybe breaking down each setting to individual attribute (fill, stroke)? Add support for
          typography?
        </p>
      </form>
    )
  }
}
