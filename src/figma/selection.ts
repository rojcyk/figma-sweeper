import { handleNode } from './nodeHandler'

export const selection = (settings: any) => {
  for (const node of figma.currentPage.selection) {
    // console.log(node)
    handleNode(node, settings)
  }
}
