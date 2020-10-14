import { checkIfStyleParsable } from './isPaintStyleParsable'

export default (localStyles: PaintStyle[]) => {
  const paintStyles: Plugin.ExportedStyle[] = []

  if (localStyles.length === 0)
    return paintStyles

  localStyles.forEach((style) => {
    const [valid, _position, requirement, fillStyle] = checkIfStyleParsable(style.paints)
    const errors = []

    if (!requirement.count) errors.push("Has too many fills.")
    if (!requirement.paint) errors.push(`Fill(s) is not a solid type.`)
    // errors.push(`We currently support solid fill styles only. (${style.paints[0].type})`)

    let tmpColor = undefined

    if (valid && fillStyle) {
      // we need to convert colors to 255 base, otherwise it will be too inprecise to compare
      tmpColor = {
        r: Math.round(fillStyle.color.r * 255),
        g: Math.round(fillStyle.color.g * 255),
        b: Math.round(fillStyle.color.b * 255)
      }

      paintStyles.push({
        key: style.key,
        name: style.name,
        paint: {
          type: fillStyle.type,
          visible: fillStyle.visible,
          opacity: fillStyle.opacity,
          blendMode: fillStyle.blendMode,
          color: tmpColor
        },
        description: style.description,
        errors: valid ? null : errors
      })
    } else {
      paintStyles.push({
        key: style.key,
        name: style.name,
        paint: null,
        errors: errors
      })
    }
  })

  return paintStyles
}