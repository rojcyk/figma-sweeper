import { launchUI } from '@utils/launchUI'
import { get_settings } from '@storage/settings'
import { get_open_state } from '@storage/openState'

figma.on('run', async () => {
  launchUI({
    settings: await get_settings(),
    openState: await get_open_state(),
    errors: {
      deleteHidden: [],
      pixelPerfect: [],
      skipLocked: [],
      noGroups: [],
      ungroupSingleGroup: [],
      removeStyleOverrides: [],
      requireTextStyles: [],
      requireEffectStyles: [],
      requireFillStyles: [],
      requireStrokeStyles: [] 
    }
  })
  
})