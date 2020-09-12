import io from "figmaio/code"
import { OPENED_STATE_CHANGE } from "../constants/events"
import { OPENED_STATE } from "../constants/storage"

export const openedStateListener = async () => {
  io.on(OPENED_STATE_CHANGE, async (openedState) => {
    console.log(openedState)
    figma.clientStorage.setAsync(OPENED_STATE, openedState)
  })
}
