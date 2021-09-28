import io from 'figmaio/code'

import { APP_START } from '@events'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '@ui'

export const launchUI = (data?: Plugin.LaunchProps, message?: string) => {
  figma.showUI(__html__, {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
  })

  /* Finally, sending the actual data over to the client */
  io.send(APP_START, data)

  if (message) figma.notify(message)
}