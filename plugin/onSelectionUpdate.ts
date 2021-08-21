import io from "figmaio/code"

import { SELECTION_UPDATE } from '@events'

io.on(SELECTION_UPDATE, async (errors: any[]) => {
  console.log('[Plugin] EVENT - Updating slection')
  const selection: BaseNode[] = []

  // console.log(errors)

  errors.forEach(error => {
    const node = figma.getNodeById(error.nodeId)
    // console.log(node)
    if (node) selection.push(node)
  })

  // console.log(figma.currentPage.selection)
  console.log('selectiiiion =======')
  console.log(selection)
  console.log(figma.currentPage.selection)

  figma.currentPage.selection = selection as readonly SceneNode[]
})