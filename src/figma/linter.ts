import io from "figmaio/code"
import { APP_LINT } from "../constants/events"
import { SearchEngine } from './searchEngine'
// import asyncForEach from "../helpers/asyncForEach"
  
export const linter = async (styles: any[]) => {
  io.on(APP_LINT, async (data) => {
    const search = new SearchEngine(styles)

    console.log('Linting ...')

    search.show()
  })
}