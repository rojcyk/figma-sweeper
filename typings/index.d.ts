declare namespace Plugin {
  type appName = "Appname"
  type ColorDistanceAlgorithm = "euclidean_distance" | "deltae"

  interface LaunchProps {
    documentName: string
    documentPaintStyles: any[]
    settings: Settings
  }

  interface Color {
    r: number
    g: number
    b: number
    opacity: number
  }

  interface Settings {
    color: ColorSettings
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
}
