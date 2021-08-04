declare module '*.png'

declare namespace Plugin {

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
    'requireEffectStyles'


  type SettingsProps = {
    [K in SettingsProp]?: boolean
  }

  type SettingsState = {
    [K in SettingsProp]: boolean
  }

  interface LaunchProps {
    settings: SettingsState
  }

  type OpenedProperties = "styles" | "colors"

  interface OpenedState {
    styles: boolean
    colors: boolean
    fonts: boolean
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
    colorDistance: ColorDistanceAlgorithm
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
