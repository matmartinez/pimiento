import Node from "./Node.js"
import ContextFunctions from "./CanvasRenderingAdditions.js"
import { Rect, Point } from "./Geometry.js"

class TextNode extends Node {
  constructor(src) {
    super()
    
    this.text = ""
    this.textColor = "black"
    this.textAlignment = "left"
    this.verticalAlignment = "center"
    this.numberOfLines = 1
    this._font = "sans-serif"
  }
  
  set font(font){
    if (font != this._font) {
      this._font = font
      
      if (font) {
        try {
          document.fonts.load(font).then(this.setNeedsDisplay.bind(this))
        }
        catch (e) {}
      }
    }
  }
  
  get font(){
    return this._font
  }
  
  drawInContext(ctx){
    ctx.font = this.font
    ctx.fillStyle = this.textColor
    
    const shadows = (this.shadowColor && (this.shadowOffset.width > 0 || this.shadowOffset.height > 0))
    if (shadows) {
      ctx.shadowColor = this.shadowColor
      ctx.shadowOffsetX = this.shadowOffset.width
      ctx.shadowOffsetY = this.shadowOffset.height
      ctx.shadowBlur = Math.max(this.shadowBlur, 0)
    }
    
    const text = this.text
    if (text && text.length > 0) {
      var rect = Rect.copy(this.frame)
      rect.origin = Point.zero()
      
      var attributes = {
        numberOfLines: this.numberOfLines,
        textAlignment: this.textAlignment,
        verticalAlignment: this.verticalAlignment
      }
      
      ContextFunctions(ctx).drawTextInRect(text, rect, attributes)
    }
  }
  
  set text(text) {
    if (this._text === text) {
      return
    }
    
    this._text = text
    this.setNeedsDisplay()
  }
  
  get text(){
    return this._text
  }
}

export default TextNode
