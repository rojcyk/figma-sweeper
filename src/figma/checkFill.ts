import { traverse } from './traverse'

const adjustColor = (color: any) => {
  // console.log(color)
  // const d = Math.sqrt((r2-r1)^2 + (g2-g1)^2 + (b2-b1)^2)
}

const colorCheck = (color: any) => {  
  switch (color.type) {
    case 'SOLID':
      adjustColor(color.color)
      break
    case 'GRADIENT_LINEAR':
    case 'GRADIENT_RADIAL':
    case 'GRADIENT_ANGULAR':
    case 'GRADIENT_DIAMOND':
      for (const item of color.gradientStops) adjustColor(item.color)
      break
  }
}

export const checkFills = (fills: any) => {
  if (fills) traverse(fills, colorCheck)
}