import * as React from "react"
import Checkbox from "./checkbox"
import io from "figmaio/ui"
import { APP_LINT } from "../constants/events"

export const SettingsForm = () => {
  const [fills, setFills] = React.useState(true)
  const [strokes, setStrokes] = React.useState(true)
  const [ignoreOpacity, setIgnoreOpacity] = React.useState(false)
  const [overwriteStyle, setOverwriteStyle] = React.useState(false)
  const [findClosest, setFindClosest] = React.useState(false)
  
  const switchFills = () => setFills(!fills)
  const switchStrokes = () => setStrokes(!strokes)
  const switchIgnoreOpacity = () => setIgnoreOpacity(!ignoreOpacity)
  const switchOverwriteStyle = () => setOverwriteStyle(!overwriteStyle)
  const switchFindClosest = () => setFindClosest(!findClosest)
  

  return (
    <form onSubmit={(e) => {
      e.preventDefault()

      const settings = {
        fills,
        strokes,
        ignoreOpacity,
        overwriteStyle,
        findClosest
      }

      io.send(APP_LINT, settings)
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
      }}>Settings</h2>

      <input type="submit" value="ReConnect" />
    </div>

      <p style={{
        lineHeight: '18px',
        opacity: '0.8',
        fontSize: '12px'
      }}>Make sure to <a href="https://help.figma.com/hc/en-us/articles/360038006754-Version-History#:~:text=Figma%20will%20periodically%20save%20versions,even%20more%20space%20to%20explore." target="blank">make a new version</a> prior to reconnecting. It isn't required, but it might save you some headaches. The plugin will check and overwrite the following properties.</p>

      <Checkbox label='Overwrite Fills' isSelected={fills}  onCheckboxChange={switchFills} />
      <Checkbox label='Overwrite Strokes' isSelected={strokes}  onCheckboxChange={switchStrokes} />
      <Checkbox label='Ignore opacity' isSelected={ignoreOpacity}  onCheckboxChange={switchIgnoreOpacity} />
      <Checkbox label='Overwrite already set styles' isSelected={overwriteStyle}  onCheckboxChange={switchOverwriteStyle} />
      <Checkbox label='Assign closest color' isSelected={findClosest}  onCheckboxChange={switchFindClosest} />

      <br /><hr /><br />

      <b>Not implemented</b><br /><br />

      <p>So far we are good ...</p>
    </form>
  )
}