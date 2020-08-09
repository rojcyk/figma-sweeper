import io from "figmaio/code"
import { APP_LINT } from "../constants/events"
import { ComparingEngine } from './searchEngine'
import { importStyles } from './importStyles'
import asyncForEach from "../helpers/asyncForEach"
import { handleNode } from "./nodeHandler"
  
export const linter = async (styles: any[]) => {
  io.on(APP_LINT, async (settings) => {
    await importStyles()

    const selection = figma.currentPage.selection
    const search = new ComparingEngine(styles)

    console.log('Linting ...')

    if (selection.length === 0) {
      figma.notify('You need to select something to lint 👅')
    } else {
      asyncForEach(selection as any[], (frame: any) => {
        handleNode(frame, settings)
      })
    }
  })
}