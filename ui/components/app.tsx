import React, { useState, useEffect } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Route, Switch, useLocation } from "react-router-dom"
import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { SETTINGS_UPDATE, ERRORS_UPDATE, APP_LINT } from "@events"
import LinterContext from "./linterContext"
import { SettingsView } from "@views/settingsView"
import { LintView } from "@views/lintView"
import { GlobalStyles } from "./globalStyles"

import {
  MAIN_ROUTE,
  SETTINGS_ROUTE
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
  const [errors, setErrors] = useState(props.errors)
  const [settings, setSettings] = useState(props.settings)
  const [openState, setOpenState] = useState(props.openState)

  function toggleSettings (settingProp: Plugin.SettingsBooleanProp) {
    const newSettings  = { ...settings }
    newSettings[settingProp] = !newSettings[settingProp]
    setSettings(newSettings)
    io.send(SETTINGS_UPDATE, newSettings)
  }

  function changeSettings (settingProp: Plugin.SettingsOtherProp, value: any) {
    const newSettings  = { ...settings }
    newSettings[settingProp] = value
    setSettings(newSettings)
    io.send(SETTINGS_UPDATE, newSettings)
  }

  useEffect(() => {
    io.on(ERRORS_UPDATE, (data) => {
      setErrors(data)
    })
  }, [])


  return (
    <LinterContext.Provider value={settings}>
      <GlobalStyles />
      <Main>
        <Switch>
          <Route exact path={MAIN_ROUTE}><LintView setErrors={setErrors} errors={errors} /></Route>
          <Route exact path={SETTINGS_ROUTE}><SettingsView openState={openState} setOpenState={setOpenState} toggle={toggleSettings.bind(this)} change={changeSettings.bind(this)} /></Route>
        </Switch>
      </Main>
    </LinterContext.Provider>
  )
}

export default App