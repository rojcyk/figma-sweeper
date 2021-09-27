import io from "figmaio/code"

import { LINT_NO_GROUPS } from '@events'
import { asyncForEach } from '@utils/asyncForEach'

io.on(LINT_NO_GROUPS, async (errors: Plugin.CanvasErrors[]) => {
  console.log('[Plugin] Framifying groups')

  let counter = 0

  await asyncForEach(errors, async (errorNode: Plugin.CanvasError ) => {
    const node = figma.getNodeById(errorNode.nodeId) as any
    const children = node.children ? node.children : []
    const parent = node.parent
    const name = node.name
    const x = node.x
    const y = node.y
    const width = node.width
    const height = node.height

    const newFrame = figma.createFrame()

    newFrame.name = name
    newFrame.x = x
    newFrame.y = y
    
    newFrame.resize(width, height)

    const index = parent.children.findIndex((childrenNode: SceneNode) => {
      return errorNode.nodeId === childrenNode.id
    })

    parent.insertChild(index, newFrame)

    children.forEach((childrenNode: SceneNode) => {
      const childX = Math.abs(x - childrenNode.relativeTransform[0][2])
      const childY = Math.abs(y - childrenNode.relativeTransform[1][2])

      newFrame.appendChild(childrenNode)

      childrenNode.x = childX
      childrenNode.y = childY
    })

    counter++
  })

  if (counter > 0) {
    figma.notify(`⚡️ Turned ${counter} group${counter === 1 ? '' : 's'} into frame${counter === 1 ? '' : 's'}`)
  }
})