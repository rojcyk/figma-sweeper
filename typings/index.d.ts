declare module '*.png'

declare namespace Plugin {

  interface LaunchProps {
    settings: Settings
    openState: OpenState
    errors: CanvasErrors
    paintStyles: ImportedColor[]
    textStyles: ImportedText[]
  }

  type SettingsBooleanProp =
    'deleteHidden' |
    'pixelPerfect' |
    'skipLocked' |
    'noGroups' |
    'ungroupSingleGroup' |
    'removeStyleOverrides' |
    'requireTextStyles' |
    'requireFillStyles' |
    'requireStrokeStyles' |
    'requireEffectStyles' |
    'layerNameLinting' |
    'enforceUploadedStyles' |
    'ignoreLayers'

  type SettingsBoolean = {
    [K in SettingsBooleanProp]: boolean;
  }

  interface Settings extends SettingsBoolean {
    layerNameCase: 'noCase' | 'camelCase' | 'snakeCase' | 'kebabCase' | 'pascalCase',    
    ignoreLayersWith: string
  }

  type SettingsProp = (keyof Settings)

  interface CanvasError {
    nodeId: string,
    nodeName: string,
    nodeType: string
  }

  type ErrorLogGroup =
    'deleteHidden' |
    'pixelPerfect' |
    'skipLocked' |
    'noGroups' |
    'ungroupSingleGroup' |
    'removeStyleOverrides' |
    'requireTextStyles' |
    'requireFillStyles' |
    'requireStrokeStyles' |
    'requireEffectStyles' |
    'enforceUploadedStyles' |
    'layerNameLinting'
  
  type CanvasErrors = {
    [K in ErrorLogGroup]: CanvasError[]
  }
  
  type ChildrenNode = FrameNode | GroupNode | ComponentSetNode | ComponentNode | InstanceNode

  type OpenSection = "general" | "styles" | "tokens" | "layerList"

  type OpenState = {
    [K in OpenSection]: boolean
  }

  interface StateProps extends LaunchProps {}

  interface Color {
    r: number
    g: number
    b: number
  }

  interface ImportedColor {
    id: string
    key: string
    name: string
    fullName: string
    fullPath: string[]
    paints: Paint[]
    type: StyleType
  }

  interface ImportedText {
    id: string
    key: string
    name: string
    fullName: string
    fullPath: string[]
    fontSize: number
    fontName: FontName
    textCase: TextCase
  }


  // --------------------------------------
  // --------------------------------------
  // --------------------------------------
  // --------------------------------------

  type ParsableStyle = [
    boolean, // is it parsable?
    number, // what is the position of the valid style?
    {
      paint: boolean // Is it a standard SOLID style?
      count: boolean // does it have less than 2 visible layers?
    },
    SolidPaint | undefined
  ]

  type ExportedStyle = {
    key: string
    name: string
    paint: SolidPaint | null
    errors: string[] | null
    description?: string
  }

  interface ExportedTextStyle {
    key: string
    name: string
    description?: string
    fontFamily: string
    fontStyle: string
    fontSize: number | PluginAPI['mixed']
    lineHeight: LineHeight | PluginAPI['mixed']
    letterSpacing: LetterSpacing | PluginAPI['mixed']
    textCase: TextCase | PluginAPI['mixed']
    textDecoration: TextDecoration | PluginAPI['mixed']
    paragraphSpacing: number
  }

  interface Settings {
    
  }

  interface ThemeOverviewI {
    toggleHandler: Function
    expanded: boolean
    isSynced: boolean
  }

  type ColorSettingsProp =
    | "overwriteStyles"
    | "overwriteFills"
    | "overwriteStrokes"
    | "ignoreOpacity"
    | "findClosestColor"

  interface ColorSettings {
    overwriteStyles: boolean
    overwriteFills: boolean
    overwriteStrokes: boolean
    ignoreOpacity: boolean
    findClosestColor: boolean
  }

  interface TextSettings {
    ignoreFamilies: boolean
    ignoreHeight: boolean
    ignoreStyle: boolean
  }

  type TextSettingsProp =
    | "ignoreFamilies"
    | "ignoreHeight"
    | "ignoreStyle"
}
