import { Rect, Point } from "../Geometry.js"

function drawTextInRect(text, rect, attributes) {    
  var maximumSize = Rect.isEmpty(rect) ? { width: Infinity, height: Infinity } : Rect.copy(rect).size
  
  var lineHeight = attributes.lineHeight || this.measureText("M").width * 1.4
  var maximumLines = attributes.numberOfLines || 0
  
  var lines = []
  var width = 0, height = 0, i, j
  var result
  
  // Measure text to fit:
  while (text.length) {
  	for (i = text.length; this.measureText(text.substr(0, i)).width > maximumSize.width; i -= 1 );
  
  	result = text.substr(0,i)
  
  	if (i !== text.length) {
    	for (j = 0; result.indexOf(" ",j) !== -1; j = result.indexOf(" ", j) + 1);
  	}
    
  	lines.push(result.substr(0, j || result.length))
  	width = Math.max(width, this.measureText(lines[ lines.length - 1]).width)
  	text = text.substr( lines[ lines.length-1 ].length, text.length)
  	height = lines.length * lineHeight
  	
  	if ((maximumLines != 0 && lines.length == maximumLines) || (height > maximumSize.height)) {
    	break
  	}
  }
  
  // Positioning:
  var origin = Point.zero()
  
  var alignmentY = attributes.verticalAlignment || "top"
  if (alignmentY == "top") {
    origin.y = Rect.minY(rect)
  } else if (alignmentY == "bottom") {
    origin.y = Rect.maxY(rect) - height + lineHeight
  } else if (alignmentY == "center") {
    origin.y = Rect.midY(rect) - Math.round(height * 0.5) + lineHeight * 0.5
  } else {
    throw "Invalid vertical aligment: " + alignmentY
  }
  
  var aligmentX = attributes.textAlignment || "left"
  if (aligmentX == "left") {
    origin.x = Rect.minX(rect)
  } else if (aligmentX == "right") {
    origin.x = Rect.maxX(rect)
  } else if (aligmentX == "center"){
    origin.x = Rect.midX(rect)
  } else {
    throw "Invalid text aligment: " + aligmentX
  }
  
  // Adjust baseline:
  var previousBaseline = this.textBaseline, previousTextAligment = this.textAlign
  this.textBaseline = (alignmentY == "center") ? "middle" : alignmentY
  this.textAlign = aligmentX

  // Draw each line:
  for (i = 0, j = lines.length; i < j; ++i ) {
    var offset = (lineHeight * i)
  	this.fillText(lines[i], origin.x, origin.y + offset)
  }
  
  // Restore baseline:
  this.textBaseline = previousBaseline
  this.textAlign = previousTextAligment
  
  return this
}

export default drawTextInRect;
