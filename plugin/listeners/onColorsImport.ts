import io from "figmaio/code"

import { COLORS_IMPORT, COLORS_UPDATE } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { get_paint_styles, set_paint_styles } from '@storage/paintStyles'
import { isStyleImported } from '@utils/isStyleImported'
import { getNameParts } from '@utils/processName'

// function componentToHex(c: number) {
//   var hex = c.toString(16);
//   return hex.length == 1 ? "0" + hex : hex;
// }

// function rgbToHex(r: number, g: number, b: number) {
//   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
// }

io.on(COLORS_IMPORT, async () => {
  console.log('[Plugin] EVENT - Importinc colors')

  const importedStyles = await get_paint_styles()
  const localStyles = figma.getLocalPaintStyles()

  await asyncForEach(localStyles, async (style: PaintStyle) => {
    const [imported, index] = isStyleImported(importedStyles, style.key)
    const nameParts = getNameParts(style.name)

    let path = ''

    if (nameParts.length > 1) {
      nameParts.forEach((entity, i) => {
        if (i === 0) path += entity
        else if (i === nameParts.length - 1) return
        else path += ` / ${entity}`
      })
    }
  

    importedStyles.push({
      id: style.id,
      key: style.key,
      name: nameParts[nameParts.length - 1],
      fullName: style.name,
      fullPath: nameParts,
      path: path,
      paints: style.paints as Paint[],
      type: style.type
    })    
  })

  await set_paint_styles(importedStyles)
  io.send(COLORS_UPDATE, importedStyles)
})