import io from "figmaio/code"

import { TEXTS_DELETE, TEXTS_UPDATE } from '@events'
import { get_text_styles, set_text_styles } from '@storage/textStyles'
import { isStyleImported } from '@utils/isStyleImported'

io.on(TEXTS_DELETE, async (color: Plugin.ImportedColor) => {
  console.log('[Plugin] Deleting the color from local storage')
  const paintStyles = await get_text_styles()
  const [isImported, index] = isStyleImported(paintStyles, color.key)

  if (index > -1) paintStyles.splice(index, 1)

  await set_text_styles(paintStyles)

  io.send(TEXTS_UPDATE, paintStyles)  
})