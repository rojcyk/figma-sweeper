import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Route, Switch } from "react-router-dom"
import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { SETTINGS_UPDATE, COLORS_UPDATE, TEXTS_UPDATE } from "@events"
import LinterContext from "./linterContext"
import { SettingsView } from "@views/settingsView"
import { LintView } from "@views/lintView"
import { TextsView } from "@views/textsView"
import { ColorsView } from "@views/colorsView"
import { GlobalStyles } from "./globalStyles"

import {
  MAIN_ROUTE,
  SETTINGS_ROUTE,
  COLORS_ROUTE,
  TEXTS_ROUTE
} from "@routes"

// ******************** //
// TOP LVL STYLING
// ******************** //


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
  const [openState, setOpenState] = useState(props.openState)
  const [paintStyles, setPaintStyles] = useState(props.paintStyles)
  const [textStyles, setTextStyles] = useState(props.textStyles)

  function toggleSettings (settingProp: Plugin.SettingsBooleanProp) {
    const newSettings: Plugin.Settings  = { ...settings }
    newSettings[settingProp] = !newSettings[settingProp]
    setSettings(newSettings)
    io.send(SETTINGS_UPDATE, newSettings)
  }

  function changeSettings (updatedSettings: Plugin.Settings) {
    setSettings(updatedSettings)
    io.send(SETTINGS_UPDATE, updatedSettings)
  }

  useEffect(() => {
    io.on(COLORS_UPDATE, (colors) => setPaintStyles(colors))
    io.on(TEXTS_UPDATE, (texts) => setTextStyles(texts))
  }, [])

  return (
    <LinterContext.Provider value={{
      settings,
      paintStyles,
      textStyles
       }}>
      <GlobalStyles />
      <Main>
        <Switch>
          <Route exact path={MAIN_ROUTE}><LintView initErrors={props.errors}/></Route>
          <Route exact path={SETTINGS_ROUTE}><SettingsView openState={openState} setOpenState={setOpenState} toggle={toggleSettings.bind(this)} change={changeSettings.bind(this)} /></Route>
          <Route exact path={COLORS_ROUTE}><ColorsView paintStyles={paintStyles}/></Route>
          <Route exact path={TEXTS_ROUTE}><TextsView textStyles={textStyles}/></Route>
        </Switch>
      </Main>
    </LinterContext.Provider>
  )
}

export default App