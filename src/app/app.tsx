import * as React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { GlobalStyles } from "./globalStyles"

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

export default class App extends React.Component<{}, {}> {
  public constructor(props: any) {
    super(props)
  }

  // ************************************************ //
  // Main render method
  // ************************************************ //

  public render(): React.ReactNode {
    return (
      <Main>
        <GlobalStyles />
        Hello world
      </Main>
    )
  }
}
