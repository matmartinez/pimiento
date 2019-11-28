import { Rect, Size, Point } from "./Geometry.js"
import Node from "./Node.js"
import ContentsGravity from "./ContentsGravity.js"
import RendererSurface from "./RendererSurface.js"
import ContextFunctions from "./CanvasRenderingAdditions.js"

class Renderer {
  constructor(scale) {
    if (!scale || scale == 0.0) {
      scale = window.devicePixelRatio
    }
    
    this.surface = new RendererSurface(Size.zero(), scale)
  }
  
  get DOMElement(){
    return this.surface.canvas
  }
  
  get scale(){
    return this.surface.scale
  }
  
  get context(){
    return this.surface.context
  }
  
  set size(size){
    this.surface.size = size
    this.update()
  }
  
  get size(){
    return this.surface.size
  }
  
  set scene(scene){
    scene.renderer = this
    
    this._scene = scene
    this.update()
  }
  
  get scene(){
    return this._scene
  }
  
  update(){
    this.updating = true
    
    const renderer = this
    const render = this.render.bind(this)
    
    function schedule(){
      if (renderer.updating) {
        renderer.frameRequest = requestAnimationFrame(frame, renderer)
      }
    }
    
    function frame(){
      render()
      schedule()
      
      renderer.updating = false
      
      if (renderer.didUpdate) {
        renderer.didUpdate()
      }
    }
    
    schedule()
  }
  
  render(){
    var { canvas, context } = this.surface
    var scene = this.scene
    
    if (!scene) {
      console.warn = "No scene attached."
    }
    
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.imageSmoothingEnabled = true
    
    this.renderTreeFromRootInContext(scene.root, context, Point.zero())
  }
  
  renderTreeFromRootInContext(node, context, offset){
    // No-op if hidden:
    if (node.hidden) {
      return
    }
    
    const { frame, alpha, scale, clips, wantsBuffer, nodes } = node
    const { origin, size } = node.frame
    
    offset.x += origin.x
    offset.y += origin.y
      
    // Alpha:
    const previousAlpha = context.globalAlpha
    if (alpha != 1) {
      context.globalAlpha *= alpha
    }
    
    // Transform matrix
    var transforms = (scale.width != 1 || scale.height != 1)
    if (transforms) {
      context.save()
      context.scale(scale.width, scale.height)
    }
    
    // Clip if needed:
    if (clips) {
      context.save()
      context.beginPath()
      context.rect(offset.x, offset.y, size.width, size.height)
      context.closePath()
      context.clip()
    }
    
    // Draw the node buffered:
    if (wantsBuffer && !Rect.isEmpty(node.frame)) {
      this.drawBackingStoreForNode(node)
      
      const { _backingStore } = node
      if (_backingStore) {
        context.drawImage(_backingStore.canvas, offset.x, offset.y, size.width, size.height)
      }
    } else {
      context.save()
      context.translate(offset.x, offset.y)
      this.drawNodeInContext(node, context)
      context.restore()
    }
    
    // Children:
    for (const childNode of node.nodes) {
      this.renderTreeFromRootInContext(childNode, context, Point.copy(offset))
    }
        
    if (clips) {
      context.restore()
    }
    
    if (transforms) {
      context.restore()
    }
    
    // Restore alpha:
    context.globalAlpha = previousAlpha
  }
  
  drawBackingStoreForNode(node){
    let { frame, contentsScale, _backingStore } = node
    let { origin, size } = frame
    
    if (contentsScale <= 0) {
      contentsScale = this.scale
    }
    
    const isResized = _backingStore && !Size.is(size, _backingStore.size)
    const isDirty = (node._isDirty || !_backingStore || isResized)
    
    if (!_backingStore) {
      _backingStore = (node._backingStore = new RendererSurface(size, contentsScale))
    }
    
    _backingStore.size = size
    _backingStore.scale = contentsScale
    
    if (isDirty) {
      const context = _backingStore.context
      context.clearRect(0, 0, size.width, size.height)
      
      this.drawNodeInContext(node, context)
      
      node._isDirty = false
    }
  }
  
  drawNodeInContext(node, context){
    // Calculate destination bounds:
    const offset = Point.zero()
    const frame = Rect.copy(node.frame)
    frame.origin = offset
    
    const { origin, size } = frame
    
    // Background:
    const background = node.background
    if (background) {
      context.fillStyle = background
      
      const radius = node.cornerRadius
      if (radius <= 0.0) {
        context.fillRect(offset.x, offset.y, size.width, size.height)
      } else {
        ContextFunctions(context).createRoundedRectPath(offset.x, offset.y, size.width, size.height, radius)
        context.fill()
      }
    }
    
    // Contents:
    const providesDrawInContext = (node.drawInContext != Node.prototype.drawInContext)
    const hasContents = (node.contents && !Rect.isEmpty(frame))
    
    if (providesDrawInContext) {
      node.drawInContext(context)
    } else if (hasContents) {
      const { contents, contentsGravity } = node
        
      if (contents.width > 0.0 && contents.height > 0.0) {
        let { x, y } = offset
        let { width, height } = size
        
        if (contentsGravity === ContentsGravity.aspect || contentsGravity === ContentsGravity.aspectFill) {
          const scaling = (contentsGravity === ContentsGravity.aspect) ? Math.min : Math.max
          const xScale = width / contents.width
          const yScale = height / contents.height
          const newScale = scaling(xScale, yScale)
          
          width = Math.round(contents.width * newScale)
          height = Math.round(contents.height * newScale)
          x = offset.x + Math.round(size.width / 2 - width / 2)
          y = offset.y + Math.round(size.height / 2 - height / 2)
        }
        
        context.drawImage(contents, x, y, width, height)
      }
    }
  }
  
}

export default Renderer
