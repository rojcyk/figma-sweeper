import { OPEN_STATE } from "@constants/storage"

export const get_open_state = async (): Promise<Plugin.OpenState> => {
  const opened_state = await figma.clientStorage.getAsync(OPEN_STATE) as Plugin.OpenState | undefined

  if (opened_state === undefined || opened_state === null) {
    const default_state: Plugin.OpenState = {
      general: false,
      styles: false,
      tokens: false,
      layerList: false
    }

    await figma.clientStorage.setAsync(OPEN_STATE, default_state)
    return default_state
  }

  return opened_state
}

export const set_open_state = async (newOpenedState: Plugin.OpenState): Promise<Plugin.OpenState> => {
  const opened_state = await figma.clientStorage.getAsync(OPEN_STATE)
  const updated_state = Object.assign(opened_state, newOpenedState)
  await figma.clientStorage.setAsync(OPEN_STATE, updated_state)

  return updated_state
}

export default {
  get: get_open_state,
  set: set_open_state
}