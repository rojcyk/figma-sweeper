import io from "figmaio/code"

import { COLORS_IMPORT } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { processNode } from '@utils/processNode'
import { CanvasErrorManager } from '@utils/canvasErrorManager'
import { get_paint_styles, set_paint_styles } from '@storage/paintStyles'
import { SYNCED_PAINT_STYLES } from "@constants/storage"

export const isImported = (arr: Plugin.ImportedColor[], key: string) => {
  return arr.find((el) => {
    if (el.key === key) return true
    else return false
  })
}

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

io.on(COLORS_IMPORT, async () => {
  console.log('[Plugin] EVENT - Importinc colors')
  // console.log(figma.getLocalPaintStyles()[0].paints)

  const importedStyles = await get_paint_styles()
  const localStyles = figma.getLocalPaintStyles()

  await asyncForEach(localStyles, async (style: PaintStyle) => {

    if (isImported(importedStyles, style.key)) return
    if (style.paints.length > 1) return

    const fill = style.paints[0]
    if (fill.type !== 'SOLID') return

    const r = Math.round(fill.color.r * 255)
    const g = Math.round(fill.color.g * 255)
    const b = Math.round(fill.color.b * 255)

    const newStyle: Plugin.ImportedColor = {
      key: style.key,
      name: style.name,
      hex: rgbToHex(r,g,b),
      opacity: fill.opacity ? fill.opacity : 1,
      color: {
        r: 0,
        g: 0,
        b: 0
      }
    }

    importedStyles.push(newStyle)
  })

  await set_paint_styles(importedStyles)

  console.log(await get_paint_styles())

  // TODO: Send it back to the UI and display the new styles
  // TODO: Maybe we should also include some error messages of what styles were ignored?
})