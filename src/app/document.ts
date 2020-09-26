import { createContext } from "react"

export const DocumentContext = createContext({
  isSynced: false,
  documentName: "",
  styles: {
    paintStyles: [] as Plugin.ExportedStyle[]
  },
  exportStyles: (): any => {},
  deleteStyles: (): any => {}
})

export const DocumentProvider = DocumentContext.Provider

export default DocumentContext
