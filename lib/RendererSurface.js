import { Rect, Size, Point } from "./Geometry.js"

class RendererSurface {
  
  constructor(size, scale){
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    context.imageSmoothingEnabled = true
    
    if (!canvas || !context) {
      throw "Cannot create renderer surface."
    }
    
    this.canvas = canvas
    this.context = context
    this.scale = scale
    this.size = size
  }
  
  configure(){
    const { canvas, context, scale, size } = this
    
    canvas.width = size.width * scale
    canvas.height = size.height * scale
    canvas.style.width = size.width
    canvas.style.height = size.height
    
    context.scale(scale, scale)
  }
  
  set size(size){
    if (Size.is(size, this.size)) {
      return
    }
    
    this._size = size
    this.configure()
  }
  
  get size(){
    return this._size || Point.zero()
  }
  
  set scale(scale){
    if (this.scale == scale) {
      return
    }
    
    this._scale = scale
    this.configure()
  }
  
  get scale(){
    return this._scale || 1
  }
  
}

export default RendererSurface
