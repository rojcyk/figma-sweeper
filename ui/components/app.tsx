import React, { useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Route, Switch, useLocation } from "react-router-dom"
import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { BACKGROUND } from "@ui"
import { SETTINGS_UPDATE } from "@events"
import LinterContext from "./linterContext"
import { MainView } from "@views/mainView"
import { LintView } from "@views/lintView"

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
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
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

  .switch-wrapper {
    position: relative;
  }

  .switch-wrapper > div {
    position: absolute;
    width: 100%;
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

export const App = (props: Plugin.LaunchProps) => {
  const [settings, setSettings] = useState(props.settings)
  const [openState] = useState(props.openState)
  const location = useLocation()

  function toggleSettings (settingProp: Plugin.SettingsProp) {
    const newSettings  = settings
    newSettings[settingProp] = !newSettings[settingProp]
    setSettings(newSettings)
    io.send(SETTINGS_UPDATE, newSettings)
  }

  return (
    <LinterContext.Provider value={settings}>
      <GlobalStyles />
      <Main>
        {/* <TransitionGroup>
          <CSSTransition
            in
            appear={true}
            timeout={300}
            classNames='fade'
            key={location.key}
          > */}
          <Switch>
            <Route exact path={MAIN_ROUTE}><MainView openState={openState} toggle={toggleSettings.bind(this)} /></Route>
            <Route exact path={LINT_ROUTE}><LintView /></Route>
          </Switch>
            {/* </CSSTransition>
        </TransitionGroup> */}
      </Main>
    </LinterContext.Provider>
  )
}

export default App