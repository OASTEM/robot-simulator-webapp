// x, y, rot
// Data is currently interpreted as relative from starting position
// not global x y position
let data = [
    [0, 0, 0],
    [0, 0, 45],
    [50, 50, 45],
    [50, 50, 0],
    [50, 100, 0]
]

/* 
    CHANGE canvasSize TO CHANGE SCALING OF PROGRAM
*/
const canvasSize = 100 // units

// Same with robot size and location in units as defined above
const robotWidth = 1 // unit
const robotHeight = 2 // units

// Robot x - y is 
const robotStartX = 50 // units
const robotStartY = 0 // units

// This is the actual size in px
// We use the _actual_ canvasHeight to scale to the canvasSize of x supposed units
// This is not a const because will change if window is resized
let canvasHeight = document.getElementById("robot-canvas").getBoundingClientRect().height

// Cache DOM objects to js var
const robot = document.getElementById("robot")
const animation = document.getElementById("animation")

// Buttons
const input = document.getElementById("input")
const generate = document.getElementById("generate")
const start = document.getElementById("start")
const reset = document.getElementById("reset")

main()

function main() {
    resetRobot()
    setButtons()
}

function resetRobot() {
    const robot = document.getElementById("robot")
    
    // Convert units to px
    const width_XPx = unitsToPixels(robotWidth)
    const height_YPx = unitsToPixels(robotHeight)
    
    const start_XPx = unitsToPixels(robotStartX)
    const start_YPx = unitsToPixels(robotStartY)
    
    // Set size
    robot.style.width = width_XPx
    robot.style.height = height_YPx
    
    // Set position to bottom left corner of robot
    /*
    robot.style.left = start_XPx
    robot.style.bottom = start_YPx
    */
    
    // Set position to center of robot
    robot.style.left = start_XPx - width_XPx / 2
    robot.style.bottom = start_YPx - height_YPx / 2
    
    // Display robot now
    robot.style.visibility = "visible"
}

function setButtons() {
    input.onclick = function() {
        data = JSON.parse(prompt("Paste in your robot data here"))
    }
    
    generate.onclick = function() {
        // Set animation
        animation.innerHTML = generateAnimation()

        // Enable buttons
        start.disabled = false
        reset.disabled = false
    }
    
    start.onclick = function() {
        robot.className = "robot-animation"
    }
    
    reset.onclick = function() {
        robot.className = ""
    }
}

function generateAnimation() {
    let animationData = dataToCssAnimation(data)
    console.log("Animation data generated")
    console.log(animationData)
    return `@keyframes robot {${animationData}}`
}

function dataToCssAnimation(data) {
    // height updated in case window was resized
    canvasHeight = document.getElementById("robot-canvas").getBoundingClientRect().height
    
    let numDataPoints = data.length
    let percentDiff = 100 / (numDataPoints - 1)
    let currPercent = 0
    let animationData = ``
    data.forEach(d => {
        animationData += addCssRow(d, currPercent)
        currPercent += percentDiff
    })
    return animationData
}

function addCssRow(data, currPercent) {
    let x = unitsToPixels(data[0])
    // negative y so Y becomes upward motion rather than downwards
    let y = -unitsToPixels(data[1])
    let rot = data[2]
    return `${currPercent}% {
    transform:
        translate(${x}px, ${y}px)
        rotate(${rot}deg);
}
`
}

function unitsToPixels(units) {
    return units * canvasHeight / canvasSize
}