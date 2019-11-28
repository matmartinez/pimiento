import Scene from "./Scene.js"
import ContentsGravity from "./ContentsGravity.js"
import { Rect, Size } from "./Geometry.js"

class Node {
  constructor() {
    this.nodes = []
    this.alpha = 1.0
    this.hidden = false
    this.background = undefined
    this.frame = Rect.zero()
    this.clips = false
    this.cornerRadius = 0.0
    this.scale = Size.make(1, 1)
    this.opaque = false
    this.name = ""
    this.contents = undefined
    this.contentsGravity = ContentsGravity.resize
    this.contentsScale = 0
    this.shadowOffset = Size.zero()
    this.shadowBlur = 0.0
    this.shadowColor = undefined
    this.wantsBuffer = true
    this._isDirty = false
    this._parent = undefined
  }
  
  drawInContext(ctx) {
    // Does nothing.
  }
  
  addChild(node){
    if (!node) {
      throw "A node is required."
    }
    
    if (!(node instanceof Node)) {
      throw "Unexpected type for node."
    }
    
    node.remove()
    node._parent = this
    
    this.nodes.push(node)
    this.displayInScene()
  }
  
  remove(){
    var parent = this._parent
    if (parent) {
      var scene = this.scene
      
      var parentNodes = parent.nodes
      if (parentNodes) {
        var indexInParent = parent.nodes.indexOf(this)
        if (indexInParent != 1) {
          parentNodes.splice(indexInParent, 1)
        }
      }
      
      this._parent = undefined
      
      if (scene) {
        scene.requestRendererDisplay()
      }
    }
  }
  
  setNeedsDisplay(){
    this._isDirty = true
    this.displayInScene()
  }
  
  displayIfNeeded(){
    if (this._isDirty) {
      var scene = this.scene
      if (scene) {
        scene.forceRendererDisplayOfNode(this)
      }
    }
  }
  
  displayInScene(){
    var scene = this.scene
    if (scene) {
      scene.requestRendererDisplay()
    }
  }
  
  set contents(contents){
    if (contents != this._contents) {
      this._contents = contents
      this.setNeedsDisplay()
    } 
  }
  
  get contents(){
    return this._contents
  }
  
  set hidden(hidden){
    if (hidden != this._hidden) {
      this._hidden = hidden
      this.displayInScene()
    }
  }
  
  get hidden(){
    return this._hidden
  }
  
  set background(background){
    if (background !== this._background) {
      this._background = background
      this.setNeedsDisplay()
    }
  }
  
  get background(){
    return this._background
  }
  
  get scene(){
    var scene = undefined
    var node = this
    do {
      if (node instanceof Scene) {
        scene = node
        break
      }
    } while (node = node._parent)
    
    return scene
  }
  
  get parent(){
    return this._parent
  }
  
  childNodeWithName(name){
    for (const node of this.nodes) {
      if (node.name === name) {
        return node
      }
      
      const match = node.childNodeWithName(name)
      if (match) {
        return match
      }
    }
    return undefined
  }
}

export default Node
