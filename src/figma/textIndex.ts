/****************************
 * COLOR INDEX
 *
 * Color index calculates the distance between different colors,
 * and is trying to do it as effectively as possible. So, it doesn't
 * do the same calculation twice. It is designed for environment
 * where a lot of caluclations will happen in succession
 *
 ***************************/

export class TextIndex {
  /****************************
   * Internal variables
   ***************************/

  settings: Plugin.Settings
  textStyles: TextStyle[]

  /****************************
   * Constructor
   ***************************/

  constructor(textStyles: TextStyle[], settings: any) {
    this.settings = settings
    this.textStyles = textStyles
  }

  /****************************
   * MAIN FINDER LOGIC
   ***************************/

  filterByFamily(styles: TextStyle[], family: string) {
    return styles.filter(textStyle => textStyle.fontName.family === family)
  }

  filterByStyle(styles: TextStyle[],family: string) {
    return styles.filter(textStyle => textStyle.fontName.style === family)
  }

  filterByHeight(styles: TextStyle[],height: number) {
    return styles.filter(textStyle => textStyle.fontSize === height)
  }

  /****************************
   * HELPERS
   ***************************/

  parseImportedStyles(styles: PaintStyle[]) {
    
  }

  // Check if opacity matches based on settings

  // checkOpacity(processedColor: Color, color: RGBA) {
  //   return this.settings.color.ignoreOpacity ? true : processedColor.a === color.a
  // }

  // findImportedColor(color: RGBA) {
  //   return this.findColorInArray(color, this.importedColors) as ProcessedColor
  // }

  // findComparedColor(color: RGBA) {
  //   return this.findColorInArray(color, this.comparedColors) as ProcessedColor
  // }

  /****************************
   * FINDERS
   ***************************/

  // findColorInArray(color: RGBA, processedArray: Color[]) {
  //   // This function is looking for a direct RGB match in the linked array

  //   return processedArray.find((processedColor) => {

  //   })
  // }
}
