// export const DEFAULT_STATE: CanvasErrors = {
//   deleteHidden: [],
//   pixelPerfect: [],
//   skipLocked: [],
//   noGroups: [],
//   ungroupSingleGroup: [],
//   removeStyleOverrides: [],
//   requireTextStyles: [],
//   requireEffectStyles: [],
//   requireFillStyles: [],
//   requireStrokeStyles: [] 
// }

export const defaultValues: Plugin.CanvasErrors = {
  deleteHidden: [],
  pixelPerfect: [],
  skipLocked: [],
  noGroups: [],
  ungroupSingleGroup: [],
  removeStyleOverrides: [],
  requireTextStyles: [],
  requireEffectStyles: [],
  requireFillStyles: [],
  requireStrokeStyles: [],
  noDefaultNames: []
}

export class CanvasErrorManager {
  settings: Plugin.SettingsState
  errors: Plugin.CanvasErrors

  constructor(pluginSettings: Plugin.SettingsState) {
    this.settings = pluginSettings
    this.errors = {
      deleteHidden: [],
      pixelPerfect: [],
      skipLocked: [],
      noGroups: [],
      ungroupSingleGroup: [],
      removeStyleOverrides: [],
      requireTextStyles: [],
      requireEffectStyles: [],
      requireFillStyles: [],
      requireStrokeStyles: [],
      noDefaultNames: []
    }
  }

  public log(errorName: Plugin.SettingsProp, node: SceneNode) {
    const found = this.errors[errorName].find(err => err.nodeId === node.id)    

    if (found === undefined) {
      this.errors[errorName].push({
        nodeId: node.id,
        nodeName: node.name,
        nodeType: node.type
      })
    }
  }

  public select(errorType: Plugin.SettingsProp) {
    return this.errors[errorType].map((errorLog) => {
      const node = figma.getNodeById(errorLog.nodeId)
      if (node) return node
    })
  }
}

export default CanvasErrorManager