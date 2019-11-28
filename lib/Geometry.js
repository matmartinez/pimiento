function SLPointMake(x, y){
  return { x:x, y:y }
}

function SLPointMakeZero(){
  return { x:0, y:0 }
}

function SLPointMakeCopy(aPoint){
  return { x:aPoint.x, y:aPoint.y }
}

function SLPointEqualToPoint(lhsPoint, rhsPoint){
  return (lhsPoint.x == rhsPoint.x && lhsPoint.y == rhsPoint.y)
}

function SLStringFromPoint(aPoint){
  return "{" + aPoint.x + ", " + aPoint.y + "}"
}

function SLSizeMake(width, height){
  return { width:width, height:height }
}

function SLSizeMakeZero(){
  return { width:0, height:0 }
}

function SLSizeMakeCopy(aSize){
  return { width:aSize.width, height:aSize.height }
}

function SLSizeEqualToSize(lhsSize, rhsSize){
  return (lhsSize.width == rhsSize.width && lhsSize.height == rhsSize.height)
}

function SLStringFromSize(aSize){
  return "{" + aSize.width + ", " + aSize.height + "}"
}

function SLRectMake(x, y, width, height){
  return { origin:{ x:x, y:y }, size:{ width:width, height:height } }
}

function SLRectMakeZero(){
  return { origin:{ x:0, y:0 }, size:{ width:0, height:0 } }
}

function SLRectMakeCopy(aRect){
  return { origin:{ x:aRect.origin.x, y:aRect.origin.y }, size:{ width:aRect.size.width, height:aRect.size.height } }
}

function SLRectEqualToRect(lhsRect, rhsRect){
  return (lhsRect.origin.x == rhsRect.origin.x &&
      lhsRect.origin.y == rhsRect.origin.y &&
      lhsRect.size.width == rhsRect.size.width &&
      lhsRect.size.height == rhsRect.size.height)
}

function SLStringFromRect(aRect){
  return "{" + SLStringFromPoint(aRect.origin) + ", " + SLStringFromSize(aRect.size) + "}"
}

function SLRectOffset(aRect, dX, dY){
  return { origin:{ x:aRect.origin.x + dX, y:aRect.origin.y + dY }, size:{ width:aRect.size.width, height:aRect.size.height } }
}

function SLRectInset(aRect, dX, dY){
  return { origin:{ x:aRect.origin.x + dX, y:aRect.origin.y + dY }, size:{ width:aRect.size.width - 2 * dX, height:aRect.size.height - 2 * dY } }
}


function SLRectGetHeight(aRect){
  return aRect.size.height
}

function SLRectGetMaxX(aRect){
  return aRect.origin.x + aRect.size.width
}

function SLRectGetMaxY(aRect){
  return aRect.origin.y + aRect.size.height
}

function SLRectGetMidX(aRect){
  return aRect.origin.x + (aRect.size.width / 2.0)
}

function SLRectGetMidY(aRect){
  return aRect.origin.y + (aRect.size.height / 2.0)
}

function SLRectGetMinX(aRect){
  return aRect.origin.x
}

function SLRectGetMinY(aRect){
  return aRect.origin.y
}

function SLRectGetWidth(aRect){
  return aRect.size.width
}

function SLRectIsEmpty(aRect){
  return (aRect.size.width <= 0.0 || aRect.size.height <= 0.0 || aRect.origin.x === Infinity || aRect.origin.y === Infinity)
}

function SLRectIsNull(aRect){
  return (aRect.origin.x === Infinity || aRect.origin.y === Infinity)
}


function SLRectContainsPoint(aRect, aPoint){
  return (aPoint.x >= aRect.origin.x &&
      aPoint.y >= aRect.origin.y &&
      aPoint.x < SLRectGetMaxX(aRect) &&
      aPoint.y < SLRectGetMaxY(aRect))
}


function SLInsetMake(top, right, bottom, left){
  return { top:top, right:right, bottom:bottom, left:left }
}

function SLInsetMakeZero(){
  return { top:0, right:0, bottom:0, left:0 }
}

function SLInsetMakeCopy(anInset){
  return { top:anInset.top, right:anInset.right, bottom:anInset.bottom, left:anInset.left }
}

function SLInsetMakeInvertedCopy(anInset){
  return { top:-anInset.top, right:-anInset.right, bottom:-anInset.bottom, left:-anInset.left }
}

function SLInsetIsEmpty(anInset){
  return (anInset.top === 0 &&
      anInset.right === 0 &&
      anInset.bottom === 0 &&
      anInset.left === 0)
}

function SLInsetEqualToInset(lhsInset, rhsInset){
  return (lhsInset.top === (rhsInset).top &&
      lhsInset.right === rhsInset.right &&
      lhsInset.bottom === rhsInset.bottom &&
      lhsInset.left === rhsInset.left)
}

const SLMinXEdge = 0
const SLMinYEdge = 1
const SLMaxXEdge = 2
const SLMaxYEdge = 3

const SLRectNull = SLRectMake(Infinity, Infinity, 0.0, 0.0)

function SLRectDivide(inRect, slice, rem, amount, edge){
  slice.origin = SLPointMakeCopy(inRect.origin)
  slice.size = SLSizeMakeCopy(inRect.size)
  rem.origin = SLPointMakeCopy(inRect.origin)
  rem.size = SLSizeMakeCopy(inRect.size)

  switch (edge)
  {
    case SLMinXEdge:
      slice.size.width = amount
      rem.origin.x += amount
      rem.size.width -= amount
      break

    case SLMaxXEdge:
      slice.origin.x = SLRectGetMaxX(slice) - amount
      slice.size.width = amount
      rem.size.width -= amount
      break

    case SLMinYEdge:
      slice.size.height = amount
      rem.origin.y += amount
      rem.size.height -= amount
      break

    case SLMaxYEdge:
      slice.origin.y = SLRectGetMaxY(slice) - amount
      slice.size.height = amount
      rem.size.height -= amount
  }
}

function SLRectContainsRect(lhsRect, rhsRect){
  var union = SLRectUnion(lhsRect, rhsRect)

  return SLRectEqualToRect(union, lhsRect)
}


function SLRectIntersectsRect(lhsRect, rhsRect){
  var intersection = SLRectIntersection(lhsRect, rhsRect)

  return !SLRectIsEmpty(intersection)
}

function SLRectIntegral(aRect){
  aRect = SLRectStandardize(aRect)

  // Store these out separately, if not the GetMaxes will return incorrect values.
  var x = Math.floor(SLRectGetMinX(aRect)),
    y = Math.floor(SLRectGetMinY(aRect))

  aRect.size.width = Math.ceil(SLRectGetMaxX(aRect)) - x
  aRect.size.height = Math.ceil(SLRectGetMaxY(aRect)) - y

  aRect.origin.x = x
  aRect.origin.y = y

  return aRect
}

function SLRectIntersection(lhsRect, rhsRect){
  var intersection = SLRectMake(Math.max(SLRectGetMinX(lhsRect), SLRectGetMinX(rhsRect)),
                  Math.max(SLRectGetMinY(lhsRect), SLRectGetMinY(rhsRect)),
                  0, 0)

  intersection.size.width = Math.min(SLRectGetMaxX(lhsRect), SLRectGetMaxX(rhsRect)) - SLRectGetMinX(intersection)
  intersection.size.height = Math.min(SLRectGetMaxY(lhsRect), SLRectGetMaxY(rhsRect)) - SLRectGetMinY(intersection)

  return SLRectIsEmpty(intersection) ? SLRectMakeZero() : intersection
}

function SLRectStandardize(aRect){
  var width = SLRectGetWidth(aRect),
    height = SLRectGetHeight(aRect),
    standardized = SLRectMakeCopy(aRect)

  if (width < 0.0) {
    standardized.origin.x += width
    standardized.size.width = -width
  }

  if (height < 0.0) {
    standardized.origin.y += height
    standardized.size.height = -height
  }

  return standardized
}

function SLRectUnion(lhsRect, rhsRect){
  var lhsRectIsNull = !lhsRect || lhsRect === SLRectNull,
    rhsRectIsNull = !rhsRect || rhsRect === SLRectNull

  if (lhsRectIsNull)
    return rhsRectIsNull ? SLRectNull : rhsRect

  if (rhsRectIsNull)
    return lhsRectIsNull ? SLRectNull : lhsRect

  var minX = Math.min(SLRectGetMinX(lhsRect), SLRectGetMinX(rhsRect)),
    minY = Math.min(SLRectGetMinY(lhsRect), SLRectGetMinY(rhsRect)),
    maxX = Math.max(SLRectGetMaxX(lhsRect), SLRectGetMaxX(rhsRect)),
    maxY = Math.max(SLRectGetMaxY(lhsRect), SLRectGetMaxY(rhsRect))

  return SLRectMake(minX, minY, maxX - minX, maxY - minY)
}

function SLRectInsetByInset(aRect, anInset){
  return SLRectMake(aRect.origin.x + anInset.left,
            aRect.origin.y + anInset.top,
            aRect.size.width - anInset.left - anInset.right,
            aRect.size.height - anInset.top - anInset.bottom)
}

function SLPointFromString(aString){
  var comma = aString.indexOf(',')

  return { x:parseFloat(aString.substr(1, comma - 1)), y:parseFloat(aString.substring(comma + 1, aString.length)) }
}

function SLSizeFromString(aString){
  var comma = aString.indexOf(',')

  return { width:parseFloat(aString.substr(1, comma - 1)), height:parseFloat(aString.substring(comma + 1, aString.length)) }
}

function SLRectFromString(aString){
  var comma = aString.indexOf(',', aString.indexOf(',') + 1)

  return { origin:SLPointFromString(aString.substr(1, comma - 1)), size:SLSizeFromString(aString.substring(comma + 2, aString.length - 1)) }
}

export const Point = {
  zero: SLPointMakeZero,
  make: SLPointMake,
  copy: SLPointMakeCopy,
  is: SLPointEqualToPoint,
  toString: SLStringFromPoint,
  fromString: SLPointFromString
}

export const Size = {
  make: SLSizeMake,
  zero: SLSizeMakeZero,
  copy: SLSizeMakeCopy,
  is: SLSizeEqualToSize,
  toString: SLStringFromSize,
  fromString: SLSizeFromString
}

export const Rect = {
  make: SLRectMake,
  zero: SLRectMakeZero,
  copy: SLRectMakeCopy,
  is: SLRectEqualToRect,
  toString: SLStringFromRect,
  fromString: SLRectFromString,
  
  offset: SLRectOffset,
  inset: SLRectInset,
  width: SLRectGetWidth,
  height: SLRectGetHeight,
  maxX: SLRectGetMaxX,
  maxY: SLRectGetMaxY,
  midX: SLRectGetMidX,
  midY: SLRectGetMidY,
  minX: SLRectGetMinX,
  minY: SLRectGetMinY,
  isEmpty: SLRectIsEmpty,
  isNull: SLRectIsNull,
  containsPoint: SLRectContainsPoint,
  nullRect: SLRectNull,
  
  divide: SLRectDivide,
  containsRect: SLRectContainsRect,
  intersectsRect: SLRectIntersectsRect,
  integralRect: SLRectIntegral,
  intersection: SLRectIntersection,
  standardize: SLRectStandardize,
  union: SLRectUnion,
  insetByInset: SLRectInsetByInset
}

export const Insets = {
  make: SLInsetMake,
  zero: SLInsetMakeZero,
  copy: SLInsetMakeCopy,
  invertedCopy: SLInsetMakeInvertedCopy,
  isEmpty: SLInsetIsEmpty,
  is: SLInsetEqualToInset,
  minXEdge: SLMinXEdge,
  minYEdge: SLMinYEdge,
  maxXEdge: SLMaxXEdge,
  maxYEdge: SLMaxYEdge
} 
