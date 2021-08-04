import io from "figmaio/code"

import { OPEN_STATE_UPDATE } from '@events'
import { set_open_state } from '@storage/openState'

io.on(OPEN_STATE_UPDATE, async (data: Plugin.OpenState) => {
  console.log('[Plugin] EVENT - Open state update')
  await set_open_state(data)
  console.log('[Plugin] SUCCESS - Open state updated')
})