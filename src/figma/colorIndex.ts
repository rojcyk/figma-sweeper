/****************************
 * COLOR INDEX
 *
 * Color index calculates the distance between different colors,
 * and is trying to do it as effectively as possible. So, it doesn't
 * do the same calculation twice. It is designed for environment
 * where a lot of caluclations will happen in succession
 *
 ***************************/

interface ProcessedColor extends RGBA {
  lab: LabColor
  id: string
}

type Color = ProcessedColor | RGBA
type LabColor = [number, number, number]

export class ColorIndex {
  /****************************
   * Internal variables
   ***************************/

  settings: Plugin.Settings
  importedColors: ProcessedColor[]
  comparedColors: ProcessedColor[]

  /****************************
   * Constructor
   ***************************/

  constructor(paintStyles: PaintStyle[], settings: any) {
    this.settings = settings
    this.importedColors = this.parseImportedStyles(paintStyles)
    this.comparedColors = []
  }

  /****************************
   * MAIN FINDER LOGIC
   ***************************/

  findSimilarColor(color: RGBA) {
    // first we need to check if the color was already looked for
    // if yes we return it
    const alreadyComparedColor = this.findComparedColor(color)
    if (alreadyComparedColor) return alreadyComparedColor

    /* So, this is new color we haven't encountered before,
     * thus we first need to create the color in Lab space.
     */
    const comparedLab = this.color2lab(color)

    // if not, we go through all the other colors and measure
    const newMeasurements: any[] = []

    this.importedColors.forEach((importedColor: ProcessedColor) => {
      let distance

      switch (this.settings.color.colorDistance) {
        case "deltae":
          distance = this.deltaE(comparedLab, importedColor.lab)
          break
        case "euclidean_distance":
        default:
          distance = this.euclideanDistance(color, importedColor)
          break
      }

      newMeasurements.push({
        distance,
        id: importedColor.id
      })
    })

    // We reduce the whole aray based on the distance, so only one color remains
    const closest = newMeasurements.reduce((prev, curr) =>
      prev.distance < curr.distance ? prev : curr
    )

    // We generate the final compared color
    const comparedColor = {
      ...color,
      id: closest.id,
      lab: comparedLab
    }

    // ... add it to the cache, so we won't have to recalculate it every time
    this.comparedColors.push(comparedColor)

    // finally return it
    return comparedColor
  }

  /****************************
   * HELPERS
   ***************************/

  parseImportedStyles(styles: PaintStyle[]) {
    let processed: ProcessedColor[] = []

    styles.forEach((style) => {
      const paint = style.paints[0]

      if (paint.type === "SOLID") {
        const color = paint.color
        const opacity = style.paints[0].opacity || 1

        const rgba = {
          ...color,
          a: opacity
        }

        if (color) {
          processed.push({
            // key: style.key,
            id: style.id,
            a: opacity,
            r: color.r,
            g: color.g,
            b: color.b,
            lab: this.color2lab(rgba)
          })
        }
      }
    })

    return processed
  }

  // Check if opacity matches based on settings

  checkOpacity(processedColor: Color, color: RGBA) {
    return this.settings.color.ignoreOpacity ? true : processedColor.a === color.a
  }

  findImportedColor(color: RGBA) {
    return this.findColorInArray(color, this.importedColors) as ProcessedColor
  }

  findComparedColor(color: RGBA) {
    return this.findColorInArray(color, this.comparedColors) as ProcessedColor
  }

  /****************************
   * FINDERS
   ***************************/

  findColorInArray(color: RGBA, processedArray: Color[]) {
    // This function is looking for a direct RGB match in the linked array

    return processedArray.find((processedColor) => {
      const opacity = this.checkOpacity(processedColor, color)

      if (
        opacity &&
        processedColor.r === color.r &&
        processedColor.g === color.g &&
        processedColor.b === color.b
      )
        return processedColor
      else return undefined
    })
  }

  /****************************
   * COMPARATORS
   ***************************/

  euclideanDistance(a: Color, b: Color) {
    /*
     * This is the core to the plugin, finding the closes possible match.
     * For the time being, it calculates a distance in 3d eucledian space
     * https://en.wikipedia.org/wiki/Euclidean_distance#Three_dimensions
     * The math behind it is rather simple, and might work for standard
     * UI design the best. It is also the simplest calculation === most
     * performant one. I will eventually explore different options
     */

    const red = b.r - a.r
    const blue = b.b - a.b
    const green = b.g - a.g
    const opacity = b.a - a.a

    /* We will be skipping the square root, it is used to get the distance in the actuall space and we don't need it, total is fine */
    /* Return Math.sqrt((red * red) + (blue * blue) + (green * green) + (opacity * opacity)) */

    return red * red + blue * blue + green * green + opacity * opacity
  }

  deltaE(labA: LabColor, labB: LabColor) {
    /* Inspired from https://github.com/calibr/rgb-lab/blob/master/color.js
     * It calculates the distance between two colors in Lab space.
     * It is harder to calculate, but should be more accuate to human perception
     */
    const deltaL = labA[0] - labB[0]
    const deltaA = labA[1] - labB[1]
    const deltaB = labA[2] - labB[2]
    const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2])
    const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2])
    const deltaC = c1 - c2
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH)
    const sc = 1.0 + 0.045 * c1
    const sh = 1.0 + 0.015 * c1
    const deltaLKlsl = deltaL / 1.0
    const deltaCkcsc = deltaC / sc
    const deltaHkhsh = deltaH / sh
    const i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh

    // I believe I might not need to do the final sqrt as is the case with eucledian space
    // return i < 0 ? 0 : Math.sqrt(i)

    return i < 0 ? 0 : i
  }

  /****************************
   * CONVERTERS
   ***************************/

  color2lab(color: Color): LabColor {
    /* Inspired from https://github.com/calibr/rgb-lab/blob/master/color.js
     * Return internal color definition in lab color space. We need to transform
     * it to lab because deltaE is calculated from that.
     */
    let r = color.r,
      g = color.g,
      b = color.b,
      x,
      y,
      z

    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116

    return [116 * y - 16, 500 * (x - y), 200 * (y - z)]
  }
}
