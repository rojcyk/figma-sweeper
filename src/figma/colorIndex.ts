import asyncForEach from "../helpers/asyncForEach"

interface Color {
  r: number,
  g: number,
  b: number,
  opacity: number
}

interface Style {
  key: string,
  id: string,
  name: string,
  paints: [{
    blendMode: string,
    opacity: number,
    type: string,
    visible: boolean,
    color: Color
  }]
}

interface ProcessedColor {
  r: number,
  g: number,
  b: number,
  opacity: number,
  key: string,
  id: string
}

interface ComparedColor {
  r: number,
  g: number,
  b: number,
  opacity: number,
  closest: string
}

const color2lab = (color: Color) => {
  let r = color.r,
      g = color.g,
      b = color.b,
      x, y, z;

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

export class ColorIndex {
  settings: any
  processedColors: ProcessedColor[]
  comparedColors: ProcessedColor[]


  constructor(paintStyles: Style[], settings: any) {
    this.settings = settings
    this.processedColors = this.parseImportedStyles(paintStyles)
    this.comparedColors = []
  }

  parseImportedStyles (styles: Style[]) {
    let processed: ProcessedColor[] = []

    styles.forEach((style: Style) => {
      const color = style.paints[0].color
      const opacity = style.paints[0].opacity

      if (color) {
        processed.push({
          key: style.key,
          id: style.id,
          opacity: opacity,
          r: color.r,
          g: color.g,
          b: color.b,
        })
      }
    })

    return processed
  }

  checkOpacity(processedColor: ProcessedColor, color: Color) {
    return this.settings.ignoreOpacity ? true : processedColor.opacity === color.opacity
  }

  findColor(color: Color) {
    /* This function is looking for a direct match in the imported
     * styles. It helps us to skip calculating the distance later on.
     */

    return this.processedColors.find((processedColor) => {
      const opacity = this.checkOpacity(processedColor, color)

      if (opacity &&
          processedColor.r === color.r &&
          processedColor.g === color.g &&
          processedColor.b === color.b)
            return processedColor

      else return undefined
    })
  }

  lookForCompared(color: Color) {
    return this.comparedColors.find((comparedColor: ProcessedColor) => {
      const opacity = this.checkOpacity(comparedColor, color)

      if (opacity &&
          color.r === comparedColor.r &&
          color.g === comparedColor.g &&
          color.b === comparedColor.b)
            return comparedColor

      else return undefined
    })
  }

  findSimilarColor(color: Color) {
    // first we need to check if the color was already looked for
    // if yes we return it
    const alreadyComparedColor = this.lookForCompared(color)
    if (alreadyComparedColor) return alreadyComparedColor

    // if not, we go through all the other colors and measure
    const newMeasurements: any[] = []

    this.processedColors.forEach((processedColor: ProcessedColor) => {
      const distance = this.compareColors(color, processedColor)

      newMeasurements.push({
        distance,
        id: processedColor.id
      })
    })

    const closest = newMeasurements.reduce((prev, curr) => prev.distance < curr.distance ? prev : curr)

    // finally return the closest one
    return closest
  }

  compareColors(a: Color | ProcessedColor, b: Color | ProcessedColor) {
    /*
     * This is the core to the plugin, finding the closes possible match.
     * For the time being, it calculates a distance in 3d eucledian space
     * https://en.wikipedia.org/wiki/Euclidean_distance#Three_dimensions
     * The math behind it is rather simple, and might work for standard
     * UI design the best. It is also the simplest calculation === most
     * performant one. I will eventually explore different options
     */

    const red = (b.r-a.r)
    const blue = (b.b-a.b)
    const green = (b.g-a.g)
    const opacity = (b.opacity-a.opacity)

    return ((red * red) + (blue * blue) + (green * green) + (opacity * opacity))

    // We will be skipping the square root, since we don't need the actuall distance
    //return Math.sqrt((red * red) + (blue * blue) + (green * green) + (opacity * opacity))
  }

  deltaE(labA: any, labB: any) {
    const deltaL = labA[0] - labB[0];
    const deltaA = labA[1] - labB[1];
    const deltaB = labA[2] - labB[2];
    const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    const deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    const sc = 1.0 + 0.045 * c1;
    const sh = 1.0 + 0.015 * c1;
    const deltaLKlsl = deltaL / (1.0);
    const deltaCkcsc = deltaC / (sc);
    const deltaHkhsh = deltaH / (sh);
    const i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
  }
}