import { launchUI } from '@utils/launchUI'
import { get_settings } from '@storage/settings'
import { get_open_state } from '@storage/openState'
import { get_paint_styles } from '@storage/paintStyles'
import { get_text_styles } from '@storage/textStyles'
import { defaultValues } from '@utils/canvasErrorManager'

figma.on('run', async () => {
  launchUI({
    settings: await get_settings(),
    openState: await get_open_state(),
    paintStyles: await get_paint_styles(),
    textStyles: await get_text_styles(),
    errors: defaultValues
  })
})