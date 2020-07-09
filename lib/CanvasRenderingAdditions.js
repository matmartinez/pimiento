import drawTextInRect from "./extras/Text.js"
import createRoundedRectPath from "./extras/RoundedRect.js"
import createSquirclePath from "./extras/Squircle.js"

function RenderingContextTrampoline(context){    
  if (!(context instanceof CanvasRenderingContext2D)) {
    throw "Unexpected type for rendering context."
  }
  
  const trampoline = (fn) => { return fn.bind(context) }
  
  return {
    drawTextInRect: trampoline(drawTextInRect),
    createRoundedRectPath: trampoline(createRoundedRectPath),
    createSquirclePath: trampoline(createSquirclePath)
  }
}

export default RenderingContextTrampoline
