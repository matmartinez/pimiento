import Pimiento from "../Pimiento.js"

const node = new Pimiento.Node()
node.frame = Pimiento.Rect.make(0, 0, 100, 100)
node.background = "red"
node.cornerRadius = 16
node.cornerCurve = Pimiento.CornerCurve.continuous

const textNode = new Pimiento.TextNode()
textNode.text = "Hello, world"
textNode.font = "80px system-ui"
textNode.frame = Pimiento.Rect.make(0, 0, 1000, 100)

const imageNode = new Pimiento.ImageNode()
imageNode.src = "https://dummyimage.com/200x200/a312a3/fff.png"
imageNode.frame = Pimiento.Rect.make(50, 50, 100, 100)
imageNode.background = "blue"

const scene = new Pimiento.Scene()
scene.addChild(node)
scene.addChild(textNode)
scene.addChild(imageNode)

const renderer = new Pimiento.Renderer()
renderer.size = Pimiento.Size.make(500, 120)
renderer.scene = scene

document.body.appendChild(renderer.DOMElement)
