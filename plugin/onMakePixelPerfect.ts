import io from "figmaio/code"

import { LINT_MAKE_PIXEL_PERFECT } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
// import { get_paint_styles, set_paint_styles } from '@storage/paintStyles'
// import { isStyleImported } from '@utils/isStyleImported'

io.on(LINT_MAKE_PIXEL_PERFECT, async (errors: Plugin.CanvasErrors[]) => {
  console.log('[Plugin] Make pixel perfect')
  console.log(errors)

  await asyncForEach(errors, (errorNode: Plugin.CanvasError ) => {
    const node = figma.getNodeById(errorNode.nodeId) as any

    if (node) {
      node.resize(parseInt(node.width, 10),parseInt(node.height, 10))
      node.x = parseInt(node.x, 10)
      node.y = parseInt(node.y, 10)
    }
  })
})