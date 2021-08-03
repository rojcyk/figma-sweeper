import * as React from "react"
import styled, { createGlobalStyle } from "styled-components"
// import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { BACKGROUND, WHITE } from "@ui"
import LinterContext from "./linterContext"
import { StylesheetView } from "./stylesheet"

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
    /* background-color: ${BACKGROUND}; */
    background-color: ${WHITE};
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
  }

  public render(): React.ReactNode {
    return (
      <LinterContext.Provider value={{
        isSynced: true
      }}>
        <GlobalStyles />

        <Main>
          <StylesheetView />
        </Main>
      </LinterContext.Provider>
    )
  }
}
