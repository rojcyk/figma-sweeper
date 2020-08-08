import io from "figmaio/code"

import { APP_START } from "../constants/events"
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants/ui"

const main = async () => {
  figma.showUI(__html__, {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
  })

  /* When launching the plugin, figma sets a command
   * if it standard launch, the command is empty
   * if it is launched from the edit button, it says "edit"
   */
  switch (figma.command) {
    /* so far, we don't differentiate */
    default:
      /* Finally, sending the actual data over to the client */
      io.send(APP_START, {
        cool: true
      })
      break
  }
}

main()
