export const traverse = (
  arr: readonly SceneNode[],
  callback: Function,
  options?: any,
  index?: any
) => {
  for (const item of arr) callback(item, options, index)
}
