// import asyncForEach from "../helpers/asyncForEach"

export class SearchEngine {
  syncedPaintStyles: any[];

  constructor(paintStyles: any[]) {
    this.syncedPaintStyles = paintStyles
  }

  show() {
    console.log(this.syncedPaintStyles)
  }
}