export const traverse = (arr: any[], callback: Function, options?: any) => {
    for (const item of arr) callback(item, options)
  }