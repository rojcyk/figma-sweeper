import { DB_VERSION } from "@constants/storage"

export const get_db_version = async (): Promise<string> => {
  const dbVersion = await figma.clientStorage.getAsync(DB_VERSION)
  return dbVersion || '1'
}

export const set_db_version = async (version: string): Promise<string> => {
  await figma.clientStorage.setAsync(DB_VERSION, version)
  return version
}

export default {
  get: get_db_version,
  set: set_db_version
}
