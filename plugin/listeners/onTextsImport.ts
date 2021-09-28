import io from "figmaio/code"

import { TEXTS_IMPORT, TEXTS_UPDATE } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { get_text_styles, set_text_styles } from '@storage/textStyles'
import { isStyleImported } from '@utils/isStyleImported'
import { getNameParts } from '@utils/processName'


io.on(TEXTS_IMPORT, async () => {
  console.log('[Plugin] EVENT - Importinc typography')

  const importedStyles = await get_text_styles()
  const localStyles = figma.getLocalTextStyles()

  await asyncForEach(localStyles, async (text: TextStyle) => {
    const [imported, index] = isStyleImported(importedStyles, text.key)
    const nameParts = getNameParts(text.name)

    let path = ''
    
    if (nameParts.length > 1) {
      nameParts.forEach((entity, i) => {
        if (i === 0) path += entity
        else if (i === nameParts.length - 1) return
        else path += ` / ${entity}`
      })
    }

    const newTypo: Plugin.ImportedText = {
      id: text.id,
      key: text.key,
      name: nameParts[nameParts.length - 1],
      fullName: text.name,
      fullPath: nameParts,
      path: path,
      fontSize: text.fontSize,
      fontName: text.fontName,
      textCase: text.textCase
    }

    if (imported) importedStyles[index] = newTypo
    else importedStyles.push(newTypo)
  })

  await set_text_styles(importedStyles)
  io.send(TEXTS_UPDATE, importedStyles)
})