import * as React from "react"
import styled from "styled-components"
import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { GlobalStyles } from "./globalStyles"
import { SettingsForm } from './setting'

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

export default class App extends React.Component<{
  name?: string,
  paintStyles?: any[]
}, {
  name?: string,
  paintStyles?: any[],
}> {
  public constructor(props: any) {
    super(props)

    this.state = {
      name: this.props.name,
      paintStyles: this.props.paintStyles
    }
  }

  // ************************************************ //
  // Main render method
  // ************************************************ //

  public render(): React.ReactNode {

    const colors = () => {
      let tmp: any[] = []

      if (this.state.paintStyles) {
        this.state.paintStyles.forEach((style) => {
          tmp.push(<span style={{
            fontSize: '12px',
            marginBottom: '4px',
            display: 'block',
            opacity: style.valid ? '1' : '0.5'
          }}>• {style.valid ? '' : '(Too complex)' } {style.name}</span>)
        })
      }

      return tmp
    }

    io.on('exported', (data) => {
      this.setState({
        name: data.name,
        paintStyles: data.paintStyles
      })
    })

    return (
      <Main>
        <GlobalStyles />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          marginBottom: '16px'
        }}>
          <h2 style={{
            display: "inline-block",
            margin: '0',
            padding: '0'
          }}>Sync</h2>

        <button onClick={(e: any) => {
          io.send('export')
        }}>Current doc</button>
        </div>

        <p style={{
        lineHeight: '18px',
        opacity: '0.8'
        }}>When linting, the plugin will look into this doc and search for the most similar color.</p>

        <div style={{ marginBottom: '4px' }}>
        <b><strong style={{ fontSize: '9px', opacity: '0.3' }}>►</strong> Synced document:</b> {this.state.name && (<span style={{ marginRight: '4px' }}>{this.state.name}</span>)}
        </div>

        <details style={{
          marginBottom: '12px'
        }}>
          <summary style={{
            marginBottom: '8px',
            fontSize: '12px',
            outline: 'none'
          }}><b>Synced colors:</b> {this.state.paintStyles ? this.state.paintStyles.length : ''}</summary>

          <p style={{
            fontSize: '12px',
            lineHeight: '18px',
            opacity: '0.5',
            padding: '8px',
            border: '1px solid rgba(0,0,0,0.14)',
            borderRadius: '3px'
          }}>
            For now, the plugin works with color styles that have a <b>single and solid</b> (not gradient) fill.
          </p>

          {colors()}
        </details>

        <SettingsForm />

      </Main>
    )
  }
}
