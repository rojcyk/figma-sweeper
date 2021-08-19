import io from "figmaio/code"

import { IN_PROGRESS_UPDATE } from '@events'

io.on(IN_PROGRESS_UPDATE, async (errors: any[]) => {
  console.log('[Plugin] EVENT - Updating in progress')
  // const selection: BaseNode[] = []

  // console.log(errors)
  // errors.forEach(error => {
  //   const node = figma.getNodeById(error.nodeId)
  //   // console.log(node)
  //   if (node) selection.push(node)
  // })

  // // console.log(figma.currentPage.selection)
  // console.log('selectiiiion =======')
  // console.log(selection)
  // console.log(figma.currentPage.selection)

  // figma.currentPage.selection = selection as readonly SceneNode[]
})