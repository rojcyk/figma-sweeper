import io from "figmaio/code"
import { APP_LINT } from "../constants/events"
import { ComparingEngine } from './searchEngine'
import { importStyles } from './importStyles'
// import asyncForEach from "../helpers/asyncForEach"
  
export const linter = async (styles: any[]) => {
  io.on(APP_LINT, async (data) => {
    await importStyles()

    const search = new ComparingEngine(styles)

    console.log('Linting ...')

    search.show()
  })
}