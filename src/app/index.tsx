import * as React from "react"
import * as ReactDOM from "react-dom"
import io from "figmaio/ui"

import { APP_START } from "../constants/events"
import App from "./app"

// ******************** //
// Figma hacks
// ******************** //

declare function require(path: string): any

// ******************** //
// UI
// ******************** //

const main = async () => {
  /* We are waiting from data coming from the code part of the app */

  const appProps = await io.async(APP_START)

  console.log(`[Plugin] App props:`)
  console.log(appProps)

  /* We are looking for a node (html element) with an ID */
  const htmlID = "react-page"
  const node = document.getElementById(htmlID)

  if (!node)
    throw new Error(
      `Node with an ID: [${htmlID}] does not exists. You should add it to your HTML file.`
    )

  /* If found, we add content to it */
  ReactDOM.render(<App {...appProps} />, node)
}

// ******************** //
// Running the main function
// ******************** //

main()
