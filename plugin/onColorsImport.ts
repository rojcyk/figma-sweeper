import io from "figmaio/code"

import { COLORS_IMPORT, COLORS_UPDATE } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { processNode } from '@utils/processNode'
import { CanvasErrorManager } from '@utils/canvasErrorManager'
import { get_paint_styles, set_paint_styles } from '@storage/paintStyles'
import { SYNCED_PAINT_STYLES } from "@constants/storage"
import { isStyleImported } from '@utils/isStyleImported'
import { getNameParts } from '@utils/processName'
import { keyframes } from "styled-components"

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

io.on(COLORS_IMPORT, async () => {
  console.log('[Plugin] EVENT - Importinc colors')

  const importedStyles = await get_paint_styles()
  const localStyles = figma.getLocalPaintStyles()

  await asyncForEach(localStyles, async (style: PaintStyle) => {
    console.log(style)


    const [imported, index] = isStyleImported(importedStyles, style.key)
    // if (!imported) return

    const nameParts = getNameParts(style.name)

    importedStyles.push({
      id: style.id,
      key: style.key,
      name: nameParts[nameParts.length - 1],
      fullName: style.name,
      fullPath: nameParts,
      paints: style.paints as Paint[],
      type: style.type
    })    

    // const fill = style.paints[0]
    // if (fill.type !== 'SOLID') return

    // const r = Math.round(fill.color.r * 255)
    // const g = Math.round(fill.color.g * 255)
    // const b = Math.round(fill.color.b * 255)

    // const nameParts = getNameParts(style.name)

    // const newStyle: Plugin.ImportedColor = {
    //   id: style.id,
    //   key: style.key,
    //   name: nameParts[nameParts.length - 1],
    //   fullName: style.name,
    //   fullPath: nameParts,
    //   hex: rgbToHex(r,g,b),
    //   opacity: fill.opacity ? fill.opacity : 1,
    //   color: {
    //     r: 0,
    //     g: 0,
    //     b: 0
    //   }
    // }

    // if (imported) importedStyles[index] = newStyle
    // else importedStyles.push(newStyle)
  })


  await set_paint_styles(importedStyles)
  io.send(COLORS_UPDATE, importedStyles)

  // TODO: Maybe we should also include some error messages of what styles were ignored?
})