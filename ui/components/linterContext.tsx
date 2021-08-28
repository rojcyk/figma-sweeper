import { createContext } from "react"
import { SETTINGS_DEFAULT } from '@constants/settings'

export const LinterContext = createContext({
  settings: SETTINGS_DEFAULT,
  paintStyles: [] as Plugin.ImportedColor[],
  textStyles: [] as Plugin.ImportedText[]
})

export default LinterContext
