import { createContext } from "react"

export const DocumentContext = createContext({
  isSynced: false,
  documentName: "",
  styles: {
    paintStyles: [] as Plugin.ExportedStyle[],
    textStyles: [] as Plugin.ExportedTextStyle[]
  },
  exportStyles: (): any => {},
  deleteStyles: (): any => {}
})

export const DocumentProvider = DocumentContext.Provider

export default DocumentContext
