import { launchUI } from '@utils/launchUI'
import { get_settings } from '@storage/settings'
import { get_open_state } from '@storage/openState'

// import { OPENED_STATE_CHANGE } from '@events'

figma.on('run', async ({ command, parameters}) => {

  launchUI({
    settings: await get_settings(),
    openState: await get_open_state()
  })
  
})