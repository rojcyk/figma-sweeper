import io from "figmaio/code"

import { DOCUMENT_NAME, DOCUMENT_PAINT_STYLES } from "../../constants/storage"
import { STYLES_EXPORT, STYLES_UPDATE } from "../../constants/events"

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
      paints[validPosition]
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

export const exportStylesListener = async () => {
  io.on(STYLES_EXPORT, async () => {
    console.log("[Linter] Exporting data")

    const localStyles = figma.getLocalPaintStyles()
    const name = figma.root.name

    if (localStyles.length !== 0) {
      let paintStyles: Plugin.ExportedStyle[] = []

      localStyles.forEach((style) => {
        const [valid, _position, requirement] = checkIfStyleParsable(style.paints)
        const errors = []

        if (!requirement.count) errors.push("Has too many fills.")
        if (!requirement.paint) errors.push(`Fill(s) is not a solid type.`)
        // errors.push(`We currently support solid fill styles only. (${style.paints[0].type})`)

        paintStyles.push({
          key: style.key,
          name: style.name,
          paint: valid ? style.paints[0] : null,
          errors: valid ? null : errors
        })
      })

      await figma.clientStorage.setAsync(DOCUMENT_NAME, name)
      await figma.clientStorage.setAsync(DOCUMENT_PAINT_STYLES, paintStyles)

      io.send(STYLES_UPDATE, {
        name,
        paintStyles,
        isSynced: true
      })
    } else {
      figma.notify("There are no paint styles in this document.")
    }
  })
}
