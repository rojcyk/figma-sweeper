import io from "figmaio/code"

import { LINT_DELETE_HIDDEN } from '@events'
import { asyncForEach } from '@utils/asyncForEach'

io.on(LINT_DELETE_HIDDEN, async (errors: Plugin.CanvasErrors[]) => {
  console.log('[Plugin] Delete hidden layers')

  await asyncForEach (errors, (node: Plugin.CanvasError) => {
    const figmaNode = figma.getNodeById(node.nodeId)

    if (figmaNode) figmaNode.remove()
  })
})