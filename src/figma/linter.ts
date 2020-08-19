import io from "figmaio/code"
import { APP_LINT } from "../constants/events"
import { ColorIndex } from './colorIndex'
import { importStyles } from './importStyles'
import asyncForEach from "../helpers/asyncForEach"
import { handleNode } from "./nodeHandler"
  
export const linter = async () => {
  io.on(APP_LINT, async (settings) => {
    const imported = await importStyles()

    console.log(imported)

    const selection = figma.currentPage.selection
    const colorIndex = new ColorIndex(imported)

    // console.log('Linting ...')

    if (selection?.length === 0) {
      figma.notify('You need to select something to lint 👅')
    } else {
      asyncForEach(selection as any[], (frame: any) => {
        handleNode(frame, settings, colorIndex)
      })
    }
  })
}