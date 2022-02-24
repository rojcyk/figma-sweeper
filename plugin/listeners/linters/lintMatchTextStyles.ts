import io from "figmaio/code"
import isEqual from 'lodash/isequal'

import { LINT_MATCH_TEXT_STYLES } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { get_text_styles } from '@storage/textStyles'

const isValidText = (node: any, importedStyle:  Plugin.ImportedText) => {
  if (!isEqual(node.fontName, importedStyle.fontName)) return false
  if (node.fontSize !== importedStyle.fontSize) return false
  if (node.textCase !== importedStyle.textCase) return false

  return true
}

io.on(LINT_MATCH_TEXT_STYLES, async (errors: Plugin.CanvasErrors[]) => {
  console.log('[Plugin] Match text styles')
  const importedStyles = await get_text_styles()

  console.log(importedStyles)

  let counter = 0
  let importError = false

  await asyncForEach(errors, async (errorNode: Plugin.CanvasError ) => {
    const node = figma.getNodeById(errorNode.nodeId) as any

    let isImportedStyle = false
    let importedStyleId: null | string = null
    let importedStyleKey = null

    for (let i = 0; i < importedStyles.length; i++) {
      if (isValidText(node, importedStyles[i])) {
        isImportedStyle = true
        importedStyleId = importedStyles[i].id
        importedStyleKey = importedStyles[i].key
        counter++
        break
      }
    }

    try {
      if (isImportedStyle && importedStyleKey) {
        const style = await figma.importStyleByKeyAsync(importedStyleKey)
          .then(value => {
            node.textStyleId = value.id
          })
          .catch(e => {
            node.textStyleId = importedStyleId
          })
      } 
    } catch (e) {
      console.log(e)
      counter--
      importError = true
    }
  })

  if (importError) figma.notify('Some styles you are trying to assign are not from a shared library.')

  if (counter > 0) {
    figma.notify(`⚡️ Connected ${counter} text style${counter === 1 ? '' : 's'}`)
  } else {
    figma.notify(`Layers are not matching any uploaded text styles`)
  }
})