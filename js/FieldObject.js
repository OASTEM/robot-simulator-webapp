const robotCanvas = document.getElementById("robot-canvas")

function unitsToPixels(units) {
    return units * canvasHeight / canvasSize
}

class FieldObject {
    // list of x, y coords
    constructor(points) {
        this.points = points
    }
    
    // Takes in another FieldObject
    isCollidingWith(other) {
        // iterates through each point in this FO
        // If any of these points is inside the other object's points
        // then it is colliding
        for (let i = 0; i < this.points.length; i++) {
            if (this.isInside(this.points[i], other.points))
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

class fieldRectangle {
    constructor(length, width, x, y) {
        let newDiv = document.createElement("div")
        newDiv.style.width = width
        newDiv.style.height = length
        newDiv.style.bottom = y
        newDiv.style.left = x
        newDiv.style.background = "purple"
        
        console.log(newDiv)
        robotCanvas.appendChild(newDiv)
    }
}

class Robot {
    constructor(length, width, x, y) {
        
    }
}

const rect = new FieldObject([
    [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] 
])
const rect2 = new FieldObject([
    [1.5, 1.5], [1.5, 3], [3, 3], [3, 1.5]
])

let thing = new fieldRectangle(20, 20, 10, 10)
let t = rect2.isCollidingWith(rect)
console.log(t)