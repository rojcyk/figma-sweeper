import * as React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Route, NavLink, HashRouter } from "react-router-dom"
import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { BACKGROUND } from "@ui"
import { SETTINGS_UPDATE } from "@events"
import LinterContext from "../linterContext"
import { MainView } from "@views/mainView"

import {
  MAIN_ROUTE,
  LINT_ROUTE
} from "@routes"

// ******************** //
// TOP LVL STYLING
// ******************** //

export const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
  }

  ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
  }

  html,
  body {
    padding: 0;
    margin: 0;
    background-color: ${BACKGROUND};
  }
`

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`

// ******************** //
// MAIN APP CLASS
// ******************** //

export default class App extends React.Component<Plugin.LaunchProps, Plugin.StateProps> {
  public constructor(props: Plugin.LaunchProps) {
    super(props)

    this.state = {
      openState: props.openState,
      settings: props.settings
    }
  }

  toggleSettings (settingProp: Plugin.SettingsProp) {
    const settings  = this.state.settings
    settings[settingProp] = !settings[settingProp]
    this.setState({ settings })
    io.send(SETTINGS_UPDATE, settings)
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <GlobalStyles />

        <LinterContext.Provider value={this.state.settings}>
          <HashRouter>
            <Main>
              <Route exact path={MAIN_ROUTE}>
                <MainView openState={this.props.openState} toggle={this.toggleSettings.bind(this)} />
              </Route>
              <Route exact path={LINT_ROUTE}>
                <div>Lintiiiiiing</div>
              </Route>
            </Main>
          </HashRouter>
        </LinterContext.Provider>
      </React.Fragment>
    )
  }
}
