import io from "figmaio/code"

import { SELECTION_UPDATE } from '@events'

io.on(SELECTION_UPDATE, async (errors: any[]) => {
  console.log('[Plugin] EVENT - Updating slection')
  const selection: BaseNode[] = []

  errors.forEach(error => {
    const node = figma.getNodeById(error.nodeId)
    if (node) selection.push(node)
  })

  console.log(selection)

  figma.currentPage.selection = selection as readonly SceneNode[]
})