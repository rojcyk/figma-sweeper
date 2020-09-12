import { OPENED_STATE } from "../constants/storage"

export const getOpenState = async (): Promise<Plugin.OpenedState> => {
  const openedState = (await figma.clientStorage.getAsync(OPENED_STATE)) as
    | Plugin.OpenedState
    | undefined

  return (
    openedState || {
      styles: false,
      colors: false
    }
  )
}
