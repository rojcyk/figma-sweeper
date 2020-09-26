declare namespace Plugin {
  type appName = "Appname"
  type ColorDistanceAlgorithm = "euclidean_distance" | "deltae"

  interface LaunchProps {
    documentName: string
    documentPaintStyles: ExportedStyle[]
    settings: Settings
    isSynced: boolean
    openedState: OpenedState
  }

  type OpenedProperties = "styles" | "colors"

  interface OpenedState {
    styles: boolean
    colors: boolean
  }

  interface StateProps extends LaunchProps {}

  type ParsableStyle = [
    boolean, // is it parsable?
    number, // what is the position of the valid style?
    {
      paint: boolean // Is it a standard SOLID style?
      count: boolean // does it have less than 2 visible layers?
    }
  ]

  type ExportedStyle = {
    key: string
    name: string
    paint: Paint | null
    errors: string[] | null
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
}
