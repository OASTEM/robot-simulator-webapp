/* 
    CHANGE canvasSize TO CHANGE SCALING OF PROGRAM
*/
const canvasSize = 100 // units

// Same with robot size and location in units as defined above
const robotWidth = 0.6858 // unit (27 inches)
const robotHeight = 0.8382 // units (33 inches)

// Robot x - y is 
const robotStartX = 50 // units
const robotStartY = 50 // units

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

let data

main()

function main() {
    data = doMath(rawData)
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
        data = doMath(data)
    }
    
    generate.onclick = function() {
        // Set animation
        robot.style.animationDuration = calcAnimationLength()
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

function calcAnimationLength() {
    return data[data.length - 1].time / 1000 + "s"
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
    // Curently assumes all times are same from each other
    // TODO use time value to properly separate key frames
    let percentDiff = 100 / (numDataPoints - 1)
    let currPercent = 0
    let animationData = ``
    data.forEach((d, i) => {
        // If last item, set percent to 100% so that animation stays at resting
        // position rather than going back to start
        if (i === data.length - 1) {
            animationData += addCssRow(d, 100)
        }
        else {
            animationData += addCssRow(d, currPercent)
            currPercent += percentDiff
        }
    })
    return animationData
}

function addCssRow(data, currPercent) {
    let x = unitsToPixels(data.x)
    let y = unitsToPixels(data.y)
    let rot = data.rot
    return `${currPercent}% {
    transform:
        translate(${x}px, ${y}px)
        rotate(${rot}deg);
}
`
}