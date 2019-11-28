import Node from "./Node.js"

class Scene {
  constructor() {
    this.root = new Node()
    this.root._parent = this
  }
  
  requestRendererDisplay(){
    var renderer = this.renderer
    if (renderer) {
      renderer.update()
    }
  }
  
  forceRendererDisplayOfNode(node){
    var renderer = this.renderer
    if (renderer) {
      renderer.drawBackingStoreForNode(node)
    }
  }
  
  addChild(node){
    this.root.addChild(node)
  }
}

export default Scene
