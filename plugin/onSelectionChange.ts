import io from "figmaio/code"

import { APP_LINT, ERRORS_UPDATE } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { processNode } from '@utils/processNode'
import { CanvasErrorManager } from '@utils/canvasErrorManager'
import { get_settings } from '@storage/settings'

figma.on('selectionchange', async () => {

})