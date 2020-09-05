import io from "figmaio/code"
import { APP_LINT } from "../constants/events"
import { ColorIndex } from './colorIndex'
import { importStyles } from './importStyles'
import asyncForEach from "../helpers/asyncForEach"
import { handleNode } from "./nodeHandler"
  
export const linter = async () => {
  io.on(APP_LINT, async (settings) => {
    const imported = await importStyles()
    const selection = figma.currentPage.selection
    const colorIndex = new ColorIndex(imported, settings)

    if (selection?.length === 0) {
      figma.notify('You need to select something for the linter to work')
    } else {
      asyncForEach(selection as any[], (frame: any) => {
        handleNode(frame, settings, colorIndex)
      })
    }
  })
}