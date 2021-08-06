import { createContext } from "react"
import { SETTINGS_DEFAULT } from '@constants/settings'

export const LinterContext = createContext(SETTINGS_DEFAULT)

export default LinterContext
