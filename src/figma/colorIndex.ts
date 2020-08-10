import asyncForEach from "../helpers/asyncForEach"

interface Color {
  r: number,
  g: number,
  b: number
}

interface Style {
  key: string,
  name: string,
  paint: {
    blendMode: string,
    opacity: number,
    type: string,
    visible: boolean,
    color: Color
  }
}

interface ProcessedColor {
  r: number,
  g: number,
  b: number,
  key: string
}

export class ColorIndex {
  syncedPaintStyles: Style[];
  processedColors: ProcessedColor[];

  constructor(paintStyles: Style[]) {
    this.syncedPaintStyles = paintStyles
    this.processedColors = this.parseStyles(paintStyles)
  }

  parseStyles (styles: Style[]) {
    let processed: ProcessedColor[] = []

    styles.forEach((style: Style) => {
      processed.push({
        key: style.key,
        r: style.paint.color.r,
        g: style.paint.color.g,
        b: style.paint.color.b,
      })
    })

    return processed
  }

  findColor({
    r, g, b
  }: Color) {
    return this.processedColors.find((color) => {
      if (color.r === r && color.g === g && color.b === b) return color
      else return undefined
    })
  }

  compare(a: Color, b: Color) {
    const red = (b.r-a.r)
    const blue = (b.b-a.b)
    const green = (b.g-a.g)

    return Math.sqrt((red * red) + (blue * blue) + (green * green))
  }

  processed() {
    console.log(this.processedColors)   
  }
}