function unitsToPixels(units) {
    return units * canvasHeight / canvasSize
}

class FieldObject {
    // list of x, y coords
    constructor(points) {
        this.points = points
    }
}

class FieldRectangle {
    constructor(length, width, x, y, color="blue") {
        let div = document.createElement("div")
        let width_XPx = unitsToPixels(width)
        let height_XPx = unitsToPixels(length)
        let start_XPx = unitsToPixels(x)
        let start_YPx = unitsToPixels(y)
        
        div.className = "field-object"
        div.style.width = width_XPx
        div.style.height = height_XPx
        div.style.left = start_XPx - width_XPx / 2
        div.style.bottom = start_YPx - height_XPx / 2
        div.style.background = color
        this.div = div
    }
    
    updateBounds() {
        let bounds = this.div.getBoundingClientRect()
        let top = bounds.top
        let left = bounds.left
        let right = bounds.right
        let bottom = bounds.bottom
        
        let coords = [
            [left, top],
            [right, top],
            [right, bottom],
            [left, bottom]
        ]
        this.coords = coords
    }
    
    draw() {
        robotCanvas.appendChild(this.div)
        this.updateBounds()
    }
    
    // Takes in another set of points
    isCollidingWith(pointsList) {
        // iterates through each point in this FO
        // If any of these points is inside the other object's points
        // then it is colliding
        for (let i = 0; i < this.coords.length; i++) {
            if (this.isInside(this.coords[i], pointsList))
                return true
        }
        return false
    }
    
    // check if point is inside a list of points
    isInside(point, poly) {
        let x = point[0]
        let y = point[1]
        
        let inside = false
        
        for (let i = 0, j = poly.length - 1; i  < poly.length; j = i++) {
            let xi = poly[i][0], yi = poly[i][1]
            let xj = poly[j][0], yj = poly[j][1]
            
            let intersect = (
                (yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi
            )
            if (intersect)
                inside = !inside;
        }
        return inside
    }
}

class Robot extends FieldRectangle {
    constructor(length, width, x, y) {
        super(length, width, x, y, "red")
        this.div.id = "robot"
    }
}

let thing = new FieldRectangle(10, 10, 50, 60)
thing.draw()