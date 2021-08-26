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
  settings: Plugin.Settings
  errors: Plugin.CanvasErrors

  constructor(pluginSettings: Plugin.Settings) {
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

  public log(errorName: Plugin.ErrorLogGroup, node: SceneNode) {
    const found = this.errors[errorName].find(err => err.nodeId === node.id)    

    if (found === undefined) {
      this.errors[errorName].push({
        nodeId: node.id,
        nodeName: node.name,
        nodeType: node.type
      })
    }
  }

  public select(errorName: Plugin.ErrorLogGroup) {
    return this.errors[errorName].map((errorLog) => {
      const node = figma.getNodeById(errorLog.nodeId)
      if (node) return node
    })
  }
}

export default CanvasErrorManager