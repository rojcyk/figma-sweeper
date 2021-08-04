import io from 'figmaio/code'

import { APP_START } from '@events'

export const launchUI = (data?: Plugin.LaunchProps, message?: string) => {
  figma.showUI(__html__, {
    width: 300,
    height: 480
  })

  /* Finally, sending the actual data over to the client */
  io.send(APP_START, data)

  if (message) figma.notify(message)
}