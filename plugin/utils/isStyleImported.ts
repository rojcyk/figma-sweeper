export const isStyleImported = (arr: any[], key: string): [boolean, number] => {
  let index = -1

  const result = arr.find((el: PaintStyle, i: number) => {
    if (el.key === key) {
      index = i
      return [true, index]
    }
  })

  if (result) return [true, index]
  else return [false, -1]
}