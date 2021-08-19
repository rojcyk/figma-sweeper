import io from "figmaio/code"

import { APP_LINT, ERRORS_UPDATE } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { processNode } from '@utils/processNode'
import { CanvasErrorManager } from '@utils/canvasErrorManager'
import { get_settings } from '@storage/settings'

figma.on('selectionchange', async () => {
  // console.log('[Plugin] Initiating linting')
  // const selection = figma.currentPage.selection as SceneNode[]


  // async function pollForChanges () {
  //   const isCurrentSelection = JSON.stringify(selection) == JSON.stringify(figma.currentPage.selection)
  //   console.log(isCurrentSelection)
  //   console.log('Pooling ...')

  //   if (isCurrentSelection) {
  //     const settings = await get_settings()
  //     const errorManager = new CanvasErrorManager(settings)
    
  //     if (selection.length === 0) {
  //       // figma.notify("You need to select something for the linter to work")
  //     } else {
  //       await asyncForEach(selection, (node: SceneNode) => processNode(node, errorManager))
  //     }
    
  //     io.send(ERRORS_UPDATE, errorManager.errors)

  //     setTimeout(() => {
  //       pollForChanges()
  //     }, 700)
  //   } else {
  //     const defaultErrors: Plugin.CanvasErrors = {
  //       deleteHidden: [],
  //       pixelPerfect: [],
  //       skipLocked: [],
  //       noGroups: [],
  //       ungroupSingleGroup: [],
  //       removeStyleOverrides: [],
  //       requireTextStyles: [],
  //       requireEffectStyles: [],
  //       requireFillStyles: [],
  //       requireStrokeStyles: [] 
  //     }

  //     io.send(ERRORS_UPDATE, defaultErrors)
  //   }
  // }

  // await pollForChanges()

})