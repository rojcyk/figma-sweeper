import { DB_VERSION } from "../constants/storage"

export const getDBVersion = async (): Promise<string> => {
  const dbVersion = await figma.clientStorage.getAsync(DB_VERSION)

  return (
    dbVersion || '1'
  )
}
