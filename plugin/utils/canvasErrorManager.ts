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
  layerNameLinting: [],
  enforceUploadedStyles: []
}

export class CanvasErrorManager {
  settings: Plugin.Settings
  errors: Plugin.CanvasErrors
  textStyles: Plugin.ImportedText[]
  paintStyles: Plugin.ImportedColor[]

  constructor({ settings, paintStyles, textStyles } : {
    settings: Plugin.Settings,
    textStyles: Plugin.ImportedText[]
    paintStyles: Plugin.ImportedColor[]
  }) {
    this.textStyles = textStyles
    this.paintStyles = paintStyles
    this.settings = settings
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
      layerNameLinting: [],
      enforceUploadedStyles: []
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

  public findInTextStyles(styleId: string) {
    return this.textStyles.find(el => el.id === styleId)
  }

  public findInPaintStyles(styleId: string) {
    return this.paintStyles.find(el => el.id === styleId)
  }
}

export default CanvasErrorManager