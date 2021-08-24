import { launchUI } from '@utils/launchUI'
import { set_settings, get_settings } from '@storage/settings'
import { get_open_state } from '@storage/openState'
import { defaultValues } from '@utils/canvasErrorManager'

figma.on('run', async () => {
  // await figma.clientStorage.setAsync('settings', null)

  launchUI({
    settings: await get_settings(),
    openState: await get_open_state(),
    errors: defaultValues
  })
})