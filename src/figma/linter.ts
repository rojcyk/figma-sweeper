import io from "figmaio/code"
import { APP_LINT } from "../constants/events"
import { ColorIndex } from './colorIndex'
import { importStyles } from './importStyles'
import asyncForEach from "../helpers/asyncForEach"
import { handleNode } from "./nodeHandler"
  
export const linter = async (styles: any[]) => {
  io.on(APP_LINT, async (settings) => {
    await importStyles()

    const selection = figma.currentPage.selection
    const colorIndex = new ColorIndex(styles)

    console.log('Imported styles ...')
    console.log(styles)

    console.log('Processed colors ...')
    colorIndex.processed()

    console.log(colorIndex.findColor({
      b: 0.7686274647712708,
      g: 0.7686274647712708,
      r: 0.7686274647712708
    }))

    console.log(colorIndex.findColor({
      b: 0.7686274647712709,
      g: 0.7686274647712708,
      r: 0.7686274647712708
    }))

    const red = {
      b: 0.16333329677581787,
      g: 0.16333329677581787,
      r: 0.8166666626930237,
    }

    const darkRed = {
      b: 0.06444445252418518,
      g: 0.06444445252418518,
      r: 0.4833333194255829
    }

    const gray = {
      b: 0.7686274647712708,
      g: 0.7686274647712708,
      r: 0.7686274647712708
    }

    console.log(colorIndex.compare(red,darkRed))
    console.log(colorIndex.compare(red,gray))

    console.log('Linting ...')

    if (selection?.length === 0) {
      figma.notify('You need to select something to lint 👅')
    } else {
      asyncForEach(selection as any[], (frame: any) => {
        handleNode(frame, settings, colorIndex)
      })
    }
  })
}