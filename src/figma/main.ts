import io from "figmaio/code"

import { APP_START } from "../constants/events"
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants/ui"
import { DOCUMENT_NAME, DOCUMENT_PAINT_STYLES, COLOR_SETTINGS } from "../constants/storage"
import { exportStyles } from "./exportStyles"
import { linter } from "./linter"
import { settingsListener } from "./settingsListener"

export const defaultColorSettings: Plugin.ColorSettings = {
  overwriteStyles: false,
  overwriteFills: true,
  overwriteStrokes: true,
  ignoreOpacity: false,
  findClosestColor: false,
  colorDistance: "deltae"
}

const main = async () => {
  figma.showUI(__html__, {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
  })

  const name = (await figma.clientStorage.getAsync(DOCUMENT_NAME)) as string
  const styles = await figma.clientStorage.getAsync(DOCUMENT_PAINT_STYLES)
  const colorSettings = (await figma.clientStorage.getAsync(COLOR_SETTINGS)) as Plugin.ColorSettings

  await exportStyles()
  await linter()
  await settingsListener()

  const settings: Plugin.Settings = {
    color: colorSettings || defaultColorSettings
  }

  console.log(settings)

  const launchProps: Plugin.LaunchProps = {
    documentName: name,
    documentPaintStyles: styles,
    settings: settings
  }

  console.log(launchProps)

  /* When launching the plugin, figma sets a command
   * if it standard launch, the command is empty
   * if it is launched from the edit button, it says "edit"
   */
  switch (figma.command) {
    /* so far, we don't differentiate */
    default:
      /* Finally, sending the actual data over to the client */
      io.send(APP_START, launchProps)
      break
  }
}

main()
