import { LINTED_NODE_ID } from "@constants/storage"

export const get_linted_node = async (): Promise<string | undefined> => {
  const settings = await figma.clientStorage.getAsync(LINTED_NODE_ID) as string | undefined
  return settings
}

export const set_linted_node = async (newId: string | undefined): Promise<string | undefined> => {
  await figma.clientStorage.setAsync(LINTED_NODE_ID, newId)
  return newId
}

export default {
  get: get_linted_node,
  set: set_linted_node
}
