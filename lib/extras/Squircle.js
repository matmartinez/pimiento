import { Rect, Point } from "../Geometry.js"

function createSquirclePath(x, y, width, height, radius){
  const rect = Rect.make(x, y, width, height);
  const limit = Math.min(width, height) / 2 / 1.52866483;
  const limitedRadius = Math.min(radius, limit);
  
  const TOP_LEFT = (x, y) => {
    return [ rect.origin.x + x * limitedRadius,
             rect.origin.y + y * limitedRadius ];
  }
  
  const TOP_RIGHT = (x, y) => {
    return [ rect.origin.x + rect.size.width - x * limitedRadius,
             rect.origin.y + y * limitedRadius ];
  }
  
  const BOTTOM_RIGHT = (x, y) => {
    return [ rect.origin.x + rect.size.width - x * limitedRadius,
             rect.origin.y + rect.size.height - y * limitedRadius ];
  }
  
  const BOTTOM_LEFT = (x, y) => {
    return [ rect.origin.x + x * limitedRadius,
             rect.origin.y + rect.size.height - y * limitedRadius ];
  }
  
  const { moveTo, lineTo, bezierCurveTo } = this;
  
  this.beginPath();
  
  moveTo.apply(this, TOP_LEFT(1.52866483, 0.00000000));
  lineTo.apply(this, TOP_RIGHT(1.52866471, 0.00000000));
  bezierCurveTo.apply(this, [].concat(
    TOP_RIGHT(1.08849323, 0.00000000),
    TOP_RIGHT(0.86840689, 0.00000000),
    TOP_RIGHT(0.66993427, 0.06549600)
    )
  );
  
  
  lineTo.apply(this, TOP_RIGHT(0.63149399, 0.07491100));
  bezierCurveTo.apply(this, [].concat(
    TOP_RIGHT(0.37282392, 0.16905899),
    TOP_RIGHT(0.16906013, 0.37282401),
    TOP_RIGHT(0.07491176, 0.63149399)
    )
  );
  
  bezierCurveTo.apply(this, [].concat(
    TOP_RIGHT(0.00000000, 0.86840701),
    TOP_RIGHT(0.00000000, 1.08849299),
    TOP_RIGHT(0.00000000, 1.52866483)
    )
  );
  
  lineTo.apply(this, BOTTOM_RIGHT(0.00000000, 1.52866471));
  
  bezierCurveTo.apply(this, [].concat(
    BOTTOM_RIGHT(0.00000000, 1.08849323),
    BOTTOM_RIGHT(0.00000000, 0.86840689),
    BOTTOM_RIGHT(0.06549569, 0.66993493)
    )
  );
  
  
  lineTo.apply(this, BOTTOM_RIGHT(0.07491111, 0.63149399));
  
  bezierCurveTo.apply(this, [].concat(
    BOTTOM_RIGHT(0.16905883, 0.37282392),
    BOTTOM_RIGHT(0.37282392, 0.16905883),
    BOTTOM_RIGHT(0.63149399, 0.07491111)
    )
  );
  
  bezierCurveTo.apply(this, [].concat(
    BOTTOM_RIGHT(0.86840689, 0.00000000),
    BOTTOM_RIGHT(0.37282392, 0.16905883),
    BOTTOM_RIGHT(1.08849323, 0.00000000)
    )
  );
  
  lineTo.apply(this, BOTTOM_LEFT(1.52866483, 0.00000000));
  
  bezierCurveTo.apply(this, [].concat(
    BOTTOM_LEFT(1.08849299, 0.00000000),
    BOTTOM_LEFT(0.86840701, 0.00000000),
    BOTTOM_LEFT(0.66993397, 0.06549569)
    )
  );
  
  lineTo.apply(this, BOTTOM_LEFT(0.63149399, 0.07491111));
  
  bezierCurveTo.apply(this, [].concat(
    BOTTOM_LEFT(0.37282401, 0.16905883),
    BOTTOM_LEFT(0.16906001, 0.37282392),
    BOTTOM_LEFT(0.07491100, 0.63149399)
    )
  );
  
  bezierCurveTo.apply(this, [].concat(
    BOTTOM_LEFT(0.00000000, 0.86840689),
    BOTTOM_LEFT(0.00000000, 1.08849323),
    BOTTOM_LEFT(0.00000000, 1.52866471)
    )
  );
  
  lineTo.apply(this, TOP_LEFT(0.00000000, 1.52866483));
  
  bezierCurveTo.apply(this, [].concat(
    TOP_LEFT(0.00000000, 1.08849299),
    TOP_LEFT(0.00000000, 0.86840701),
    TOP_LEFT(0.06549600, 0.66993397)
    )
  );
  
  lineTo.apply(this, TOP_LEFT(0.07491100, 0.63149399));
  
  bezierCurveTo.apply(this, [].concat(
    TOP_LEFT(0.16906001, 0.37282401),
    TOP_LEFT(0.37282401, 0.16906001),
    TOP_LEFT(0.63149399, 0.07491100)
    )
  );
  
  bezierCurveTo.apply(this, [].concat(
    TOP_LEFT(0.86840701, 0.00000000),
    TOP_LEFT(1.08849299, 0.00000000),
    TOP_LEFT(1.52866483, 0.00000000)
    )
  );
  
  this.closePath();
  
  return this;
}

export default createSquirclePath;
