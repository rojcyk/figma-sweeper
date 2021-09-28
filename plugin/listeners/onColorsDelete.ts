import io from "figmaio/code"

import { COLORS_DELETE, COLORS_UPDATE } from '@events'
import { get_paint_styles, set_paint_styles } from '@storage/paintStyles'
import { isStyleImported } from '@utils/isStyleImported'

io.on(COLORS_DELETE, async (color: Plugin.ImportedColor) => {
  console.log('[Plugin] Deleting the color from local storage')
  const paintStyles = await get_paint_styles()
  const [isImported, index] = isStyleImported(paintStyles, color.key)

  if (index > -1) paintStyles.splice(index, 1)

  await set_paint_styles(paintStyles)

  io.send(COLORS_UPDATE, paintStyles)  
})