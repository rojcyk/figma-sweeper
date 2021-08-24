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
  layerNameLinting: []
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
      layerNameLinting: []
    }
  }

  public log(errorName: Plugin.SettingsBooleanProp, node: SceneNode) {
    const found = this.errors[errorName].find(err => err.nodeId === node.id)    

    if (found === undefined) {
      this.errors[errorName].push({
        nodeId: node.id,
        nodeName: node.name,
        nodeType: node.type
      })
    }
  }

  public select(errorType: Plugin.SettingsBooleanProp) {
    return this.errors[errorType].map((errorLog) => {
      const node = figma.getNodeById(errorLog.nodeId)
      if (node) return node
    })
  }
}

export default CanvasErrorManager