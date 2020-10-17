import * as React from "react"
import styled from "styled-components"
import io from "figmaio/ui"
import { Route, NavLink, HashRouter } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { DocumentProvider } from "./document"
import { GlobalStyles } from "./globalStyles"
import {
  STYLES_EXPORT,
  STYLES_DELETE,
  STYLES_UPDATE,
  OPENED_STATE_CHANGE,
  COLOR_SETTINGS_STATUS_UPDATE,
  TEXT_SETTINGS_STATUS_UPDATE
} from "../constants/events"
import { MainView } from './mainView'

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
          colors: false,
          fonts: false
        }

    this.state = {
      documentName: this.props.documentName,
      documentPaintStyles: this.props.documentPaintStyles,
      documentTextStyles: this.props.documentTextStyles,
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
  }

  private deleteStyles() {
    io.send(STYLES_DELETE)

    const newOpenedState: Plugin.OpenedState = {
      styles: true,
      colors: false,
      fonts: false
    }

    this.setNewOpenedState(newOpenedState)
  }

  private setNewOpenedState(newOpenedState: Plugin.OpenedState) {
    this.setState({
      openedState: newOpenedState
    })
    io.send(OPENED_STATE_CHANGE, newOpenedState)
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
        documentTextStyles: data.textStyles,
        isSynced: data.name !== ""
      })
    })

    io.on(COLOR_SETTINGS_STATUS_UPDATE, (newColorSettings) => {
      let tmpSettings = this.state.settings
      Object.assign(tmpSettings.color, newColorSettings) 
      this.setState({ settings: tmpSettings })
    })

    io.on(TEXT_SETTINGS_STATUS_UPDATE, (newTextSettings) => {
      let tmpSettings = this.state.settings
      Object.assign(tmpSettings.text, newTextSettings) 
      this.setState({ settings: tmpSettings })
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
            paintStyles: this.state.documentPaintStyles,
            textStyles: this.state.documentTextStyles
          }
        }}
      >
        <GlobalStyles />

        <Main>
          <HashRouter>
            <Route exact path="/" component={() => {
              return (
                <MainView 
                  isSynced={this.state.isSynced}
                  openedState={this.state.openedState}
                  settings={this.state.settings}
                  toogleSection={this.toogleSection.bind(this)}
                />)
              }} />
            
            <Route exact path='/colors' component={() => {
              return (
                <>
                  <span>hovno</span>
                  <NavLink to="/">Home</NavLink>
                </>
              )
            }} />
            
          </HashRouter>
        </Main>
      </DocumentProvider>
    )
  }
}
