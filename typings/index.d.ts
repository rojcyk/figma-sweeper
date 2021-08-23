declare module '*.png'

declare namespace Plugin {

  interface LaunchProps {
    settings: SettingsState
    openState: OpenState
    errors: CanvasErrors
  }

  type SettingsProp =
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
    'noDefaultNames'


  type SettingsProps = {
    [K in SettingsProp]?: boolean
  }

  type SettingsState = {
    [K in SettingsProp]: boolean
  }

  interface CanvasError {
    nodeId: string,
    nodeName: string,
    nodeType: string
  }
  
  type CanvasErrors = {
    [K in SettingsProp]: CanvasError[]
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
