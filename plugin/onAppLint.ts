import io from "figmaio/code"

import { APP_LINT, ERRORS_UPDATE } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { processNode } from '@utils/processNode'
import { CanvasErrorManager } from '@utils/canvasErrorManager'

io.on(APP_LINT, async (settings: Plugin.SettingsState) => {
  console.log('[Plugin] Initiating linting')
  // console.log('[Plugin] Settings', settings)

  const selection = figma.currentPage.selection as SceneNode[]
  const errorManager = new CanvasErrorManager(settings)

  if (selection.length === 0) {
    // figma.notify("You need to select something for the linter to work")
  } else {
    await asyncForEach(selection, (node: SceneNode) => processNode(node, errorManager))
    // figma.notify("Selection linted 👊")
  }

  // console.log('Delete hidden:', errorManager.select('deleteHidden'))
  // console.log('Ungroup Single Group:', errorManager.select('ungroupSingleGroup'))
  // console.log('Pixel Perfect:', errorManager.select('pixelPerfect'))
  // console.log('Require fill style:', errorManager.select('requireFillStyles'))
  // console.log('Require text style:', errorManager.select('requireTextStyles'))
  // console.log('Require stroke style:', errorManager.select('requireStrokeStyles'))
  // console.log('Require effect style:', errorManager.select('requireEffectStyles'))
  
  console.log(errorManager.errors)
  io.send(ERRORS_UPDATE, errorManager.errors)

  // figma.ui.postMessage({
  //   type: ERRORS_UPDATE,
  //   errors: errorManager.errors
  // })

  return null
})