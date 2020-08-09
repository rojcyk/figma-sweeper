import * as React from "react"
import Checkbox from "./checkbox"
import io from "figmaio/ui"

export const SettingsForm = () => {
  const [fills, setFills] = React.useState(true)
  
  const switchFills = () => setFills(!fills)

  return (
    <form onSubmit={(e) => {
      e.preventDefault()

      io.send('submit', {
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
      }}>Linter</h2>

      <input type="submit" value="Lint" />
    </div>

      <p>The plugin will check and fix the following properties!</p>

      <Checkbox label='Fills' isSelected={fills}  onCheckboxChange={switchFills} />
    </form>
  )
}