export const checkIfStyleParsable = (
  paints: readonly Paint[] | PluginAPI["mixed"]
): Plugin.ParsableStyle => {
  let visibleLayers = 0
  let paintRequirement = true
  let position = -1
  let validPosition = 0

  if (paints !== figma.mixed) {
    paints.forEach((paintStyle: any) => {
      position++
      if (paintStyle.visible) {
        visibleLayers++

        if (paintStyle.type !== "SOLID") {
          paintRequirement = false
        } else {
          validPosition = position
        }
      }
    })

    const lengthRequirement = visibleLayers === 1
    const valid = paintRequirement && lengthRequirement

    return [
      valid,
      validPosition,
      {
        paint: paintRequirement,
        count: lengthRequirement
      },
      paints[validPosition] as SolidPaint
    ]
  } else {
    return [
      false,
      0,
      {
        paint: false,
        count: false
      },
      undefined
    ]
  }
}