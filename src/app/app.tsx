import * as React from "react"
import styled from "styled-components"
import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { DocumentProvider } from "./document"
import { GlobalStyles } from "./globalStyles"
import Styles from "./styles"
import Colors from "./colors"
import {
  STYLES_EXPORT,
  STYLES_DELETE,
  APP_LINT,
  STYLES_UPDATE,
  OPENED_STATE_CHANGE
} from "../constants/events"
import LinterButton from "./lint/index"
import { Footer } from "./footer"

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

export default class App extends React.Component<Plugin.LaunchProps, Plugin.StateProps> {
  public constructor(props: any) {
    super(props)

    const openedState: Plugin.OpenedState = this.props.isSynced
      ? this.props.openedState
      : {
          styles: true,
          colors: false
        }

    this.state = {
      documentName: this.props.documentName,
      documentPaintStyles: this.props.documentPaintStyles,
      settings: this.props.settings,
      isSynced: this.props.isSynced,
      openedState: openedState
    }
  }

  // ************************************************ //
  // Main render method
  // ************************************************ //

  private exportStyles() {
    io.send(STYLES_EXPORT)

    // const newOpenedState: Plugin.OpenedState = {
    //   styles: false,
    //   colors: false
    // }

    // this.setNewOpenedState(newOpenedState)
  }

  private deleteStyles() {
    io.send(STYLES_DELETE)

    const newOpenedState: Plugin.OpenedState = {
      styles: true,
      colors: false
    }

    this.setNewOpenedState(newOpenedState)
  }

  private setNewOpenedState(newOpenedState: Plugin.OpenedState) {
    this.setState({
      openedState: newOpenedState
    })
    io.send(OPENED_STATE_CHANGE, newOpenedState)
  }

  private lint() {
    io.send(APP_LINT)
  }

  public toogleSection(openedProp: Plugin.OpenedProperties) {
    let tmpState = this.state.openedState

    tmpState[openedProp] = !tmpState[openedProp]

    this.setState({
      openedState: tmpState
    })

    io.send(OPENED_STATE_CHANGE, tmpState)
  }

  public componentDidMount() {
    io.on(STYLES_UPDATE, (data) => {
      this.setState({
        documentName: data.name,
        documentPaintStyles: data.paintStyles,
        isSynced: data.name !== ""
      })
    })
  }

  public render(): React.ReactNode {
    return (
      <DocumentProvider
        value={{
          isSynced: this.state.isSynced,
          documentName: this.state.documentName,
          exportStyles: this.exportStyles.bind(this),
          deleteStyles: this.deleteStyles.bind(this),
          styles: {
            paintStyles: this.state.documentPaintStyles
          }
        }}
      >
        <Main>
          <GlobalStyles />

          <Styles
            isSynced={this.state.isSynced}
            expanded={this.state.openedState.styles}
            toggleHandler={this.toogleSection.bind(this)}
          />

          <Colors
            settings={this.state.settings.color}
            isSynced={this.state.isSynced}
            expanded={this.state.openedState.colors}
            toggleHandler={this.toogleSection.bind(this)}
          />

          <LinterButton linterAction={this.lint} isActive={this.state.isSynced} />

          <Footer />
        </Main>
      </DocumentProvider>
    )
  }
}
