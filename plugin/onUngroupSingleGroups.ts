import io from "figmaio/code"

import { LINT_UNGROUP_SINGLE_GROUPS } from '@events'
import { asyncForEach } from '@utils/asyncForEach'

io.on(LINT_UNGROUP_SINGLE_GROUPS, async (errors: Plugin.CanvasErrors[]) => {
  console.log('[Plugin] Ungroup single groups')

  await asyncForEach (errors.reverse(), (errorNode: Plugin.CanvasError) => {
    const node = figma.getNodeById(errorNode.nodeId) as any
    const nodeChildren = node.children

    if (!node || !node.parent) return null
    if (!Array.isArray(nodeChildren) || !nodeChildren.length) return null

    let parent: any = node.parent
    if (parent.type === 'INSTANCE') return null

    const index = parent.children.findIndex((childrenNode: SceneNode) => {
      return errorNode.nodeId === childrenNode.id
    })

    nodeChildren.forEach((childNode) => {
      parent.insertChild(index, childNode)
    })
  })
})