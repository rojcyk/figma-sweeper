import { launchUI } from '@utils/launchUI'
import { get_settings } from '@storage/settings'

figma.on('run', async ({ command, parameters}) => {
  launchUI({
    settings: await get_settings()
  })
})