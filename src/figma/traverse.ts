import { ColorIndex } from "./colorIndex"
import { TextIndex } from "./textIndex"

export const traverse = (
  arr: readonly SceneNode[],
  callback: Function,
  options?: any,
  colorIndex?: ColorIndex,
  textIndex?: TextIndex
) => {
  for (const item of arr) callback(item, options, colorIndex, textIndex)
}
