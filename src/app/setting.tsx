import * as React from "react"
import Checkbox from "./checkbox"
import io from "figmaio/ui"
import { APP_LINT } from "../constants/events"

export const SettingsForm = () => {
  const [fills, setFills] = React.useState(true)
  
  const switchFills = () => setFills(!fills)

  return (
    <form onSubmit={(e) => {
      e.preventDefault()

      io.send(APP_LINT, {
        fills
      })
    }}>

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
      }}>Lint</h2>

      <input type="submit" value="Lint" />
    </div>

      <p style={{
        lineHeight: '18px',
        opacity: '0.8',
        fontSize: '12px'
      }}>Make sure to save your file before proceeding. The plugin will check and overwrite the following properties.</p>

      <Checkbox label='Overwrite Fills' isSelected={fills}  onCheckboxChange={switchFills} /><br />

      <hr /><br />

      <b>Not implemented</b><br /><br />

      <Checkbox label='Overwrite stroke' isSelected={false}  onCheckboxChange={() => { }} />
      <Checkbox label='Ignore opacity' isSelected={false}  onCheckboxChange={() => { }} /><br /><br />
    </form>
  )
}