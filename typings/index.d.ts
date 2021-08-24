declare module '*.png'

declare namespace Plugin {

  interface LaunchProps {
    settings: SettingsState
    openState: OpenState
    errors: CanvasErrors
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
    'layerNameLinting'

  type SettingsOtherProp =
    'layerNameCase'

  type SettingsProp =
    SettingsBooleanProp |
    SettingsOtherProp

  type SettingsCase = 'noCase' | 'camelCase' | 'snakeCase' | 'kebabCase' | 'pascalCase'

  type SettingsBooleanProps = {
    [K in SettingsBooleanProp]?: boolean
  }

  type SettingsBooleanState = {
    [K in SettingsBooleanProp]: boolean
  }

  interface SettingsProps extends SettingsBooleanProps {
    layerNameCase: SettingsCase
  }

  interface SettingsState extends SettingsBooleanState {
    layerNameCase: SettingsCase
  }

  interface CanvasError {
    nodeId: string,
    nodeName: string,
    nodeType: string
  }
  
  type CanvasErrors = {
    [K in SettingsBooleanProp]: CanvasError[]
  }
  
  type ChildrenNode = FrameNode | GroupNode | ComponentSetNode | ComponentNode | InstanceNode

  type OpenSection = "general" | "styles"

  type OpenState = {
    [K in OpenSection]: boolean
  }

  interface StateProps extends LaunchProps {}

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

  interface Color {
    r: number
    g: number
    b: number
    opacity: number
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
