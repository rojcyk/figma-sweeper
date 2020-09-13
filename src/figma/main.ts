import io from "figmaio/code"

import { APP_START } from "../constants/events"
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants/ui"
import { DOCUMENT_NAME, DOCUMENT_PAINT_STYLES, COLOR_SETTINGS } from "../constants/storage"
import { exportStylesListener } from "./listeners/exportStylesListener"
import { deleteStylesListener } from "./listeners/deleteStylesListener"
import { linterListener } from "./listeners/linterListener"
import { settingsListener } from "./listeners/settingsListener"
import { openedStateListener } from "./listeners/openedStateListener"
import { getSettings } from "./getSettings"
import { getOpenState } from "./getOpenState"

const main = async () => {
  figma.showUI(__html__, {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
  })

  const name = (await figma.clientStorage.getAsync(DOCUMENT_NAME)) as string
  const styles = (await figma.clientStorage.getAsync(
    DOCUMENT_PAINT_STYLES
  )) as Plugin.ExportedStyle[]
  const settings = await getSettings()
  const openedState = await getOpenState()

  await exportStylesListener()
  await deleteStylesListener()
  await linterListener()
  await settingsListener()
  await openedStateListener()

  const launchProps: Plugin.LaunchProps = {
    documentName: name,
    documentPaintStyles: styles,
    settings: settings,
    isSynced: name !== "",
    openedState: openedState
  }

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
