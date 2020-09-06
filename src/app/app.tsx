import * as React from "react"
import styled from "styled-components"
import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { GlobalStyles } from "./globalStyles"
import { SettingsForm } from "./setting"
// import { STYLES_EXPORT } from "../constants/events"
import { ThemeOverview } from "./themeOverview"

// ******************** //
// TOP LVL STYLING
// ******************** //

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
`

// ******************** //
// MAIN APP CLASS
// ******************** //

export default class App extends React.Component<Plugin.LaunchProps, Plugin.StateProps> {
  public constructor(props: any) {
    super(props)

    this.state = {
      documentName: this.props.documentName,
      documentPaintStyles: this.props.documentPaintStyles,
      settings: this.props.settings
    }
  }

  // ************************************************ //
  // Main render method
  // ************************************************ //

  public render(): React.ReactNode {
    io.on("exported", (data) => {
      this.setState({
        documentName: data.name,
        documentPaintStyles: data.paintStyles
      })
    })

    return (
      <Main>
        <GlobalStyles />

        <ThemeOverview
          name={this.state.documentName}
          styles={{
            paintStyles: this.state.documentPaintStyles
          }}
        />

        <SettingsForm currentSettings={this.props.settings.color} />
      </Main>
    )
  }
}
