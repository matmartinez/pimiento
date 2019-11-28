import Node from "./Node.js"

class ImageNode extends Node {
  constructor(src) {
    super()
    
    var storage = document.createElement("canvas")
    var image = new Image()
    image.onload = this.setNeedsDisplay.bind(this)
    
    this._image = image
    this.contents = image
  }
  
  set src(URL) {
    if (!URL) {
      URL = ""
    }
    
    if (URL != this._image.src) {
      this._image.src = URL
      this.setNeedsDisplay()
    }
  }
  
  get src(){
    return this._image.src
  }
}

export default ImageNode
