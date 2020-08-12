import asyncForEach from "../helpers/asyncForEach"

interface Color {
  r: number,
  g: number,
  b: number
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
  key: string,
  id: string
}

export class ColorIndex {
  syncedPaintStyles: Style[]
  processedColors: ProcessedColor[]
  comparedColors: ProcessedColor[]


  constructor(paintStyles: Style[]) {
    this.syncedPaintStyles = paintStyles
    this.processedColors = this.parseImportedStyles(paintStyles)
    this.comparedColors = []
  }

  parseImportedStyles (styles: Style[]) {
    let processed: ProcessedColor[] = []

    styles.forEach((style: Style) => {
      const color = style.paints[0].color

      processed.push({
        key: style.key,
        id: style.id,
        r: color.r,
        g: color.g,
        b: color.b,
      })
    })

    return processed
  }

  assignNewColor(color: Color) {
    const alreadyImportedColor = this.findColor(color)

    if (alreadyImportedColor) return alreadyImportedColor
    else null
  }

  findColor(color: Color) {
    /* This function is looking for a direct match in the imported
     * styles. It helps us to skip calculating the distance later on.
     */
    return this.processedColors.find((processedColor) => {
      if (processedColor.r === color.r &&
          processedColor.g === color.g &&
          processedColor.b === color.b)
            return processedColor

      else return undefined
    })
  }

  compare(a: Color, b: Color) {
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

    return Math.sqrt((red * red) + (blue * blue) + (green * green))
  }

  processed() {
    console.log(this.processedColors)   
  }
}