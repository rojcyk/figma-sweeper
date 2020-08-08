
export const selection = () => {
  for (const node of figma.currentPage.selection) {
    console.log(node)
  }
}
