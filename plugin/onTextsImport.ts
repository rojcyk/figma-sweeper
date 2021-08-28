import io from "figmaio/code"

import { TEXTS_IMPORT, TEXTS_UPDATE } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { processNode } from '@utils/processNode'
import { CanvasErrorManager } from '@utils/canvasErrorManager'
import { get_text_styles, set_text_styles } from '@storage/textStyles'
import { SYNCED_PAINT_STYLES } from "@constants/storage"
import { isStyleImported } from '@utils/isStyleImported'
import { getNameParts } from '@utils/processName'


io.on(TEXTS_IMPORT, async () => {
  console.log('[Plugin] EVENT - Importinc typography')

  const importedStyles = await get_text_styles()
  const localStyles = figma.getLocalTextStyles()

  await asyncForEach(localStyles, async (text: TextStyle) => {
    const [imported, index] = isStyleImported(importedStyles, text.key)
    const nameParts = getNameParts(text.name)

    const newTypo: Plugin.ImportedText = {
      name: nameParts[nameParts.length - 1],
      fullName: text.name,
      fullPath: nameParts,
      id: text.id,
      key: text.key,
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