import io from "figmaio/code"
import isEqual from 'lodash/isequal'

import { LINT_MATCH_FILL_STYLES } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { get_paint_styles, set_paint_styles } from '@storage/paintStyles'
import { isStyleImported } from "@utils/isStyleImported"

io.on(LINT_MATCH_FILL_STYLES, async (errors: Plugin.CanvasErrors[]) => {
  console.log('[Plugin] Match fill styles')

  let counter = 0
  let importError = false

  const importedStyles = await get_paint_styles()
  await asyncForEach(errors, async (errorNode: Plugin.CanvasError ) => {
    const node = figma.getNodeById(errorNode.nodeId) as any

    let isImportedStyle = false
    let importedStyleId = null

    for (let i = 0; i < importedStyles.length; i++) {
      if (isEqual(node.fills, importedStyles[i].paints)) {
        isImportedStyle = true
        importedStyleId = importedStyles[i].id
        counter++
        break
      }
    }

    try {
      if (isImportedStyle) node.fillStyleId = importedStyleId
    } catch (e) {
      counter--
      importError = true
    }
    
  })

  if (importError) figma.notify('Some styles you are trying to assign are not from a shared library.')

  if (counter > 0) {
    figma.notify(`⚡️ Connected ${counter} fill style${counter === 1 ? '' : 's'}`)
  } else {
    figma.notify(`Layers are not matching any uploaded fill styles`)
  }
})