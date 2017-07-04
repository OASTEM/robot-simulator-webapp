let data

main()

const robot = new Robot(robotHeight, robotWidth, robotStartX, robotStartY)
robot.draw()

function main() {
    data = doMath(rawData)
    resetRobot()
    setButtons()
}

function resetRobot() {
    
}

function setButtons() {
    input.onclick = function() {
        data = JSON.parse(prompt("Paste in your robot data here"))
        data = doMath(data)
    }
    
    generate.onclick = function() {
        // Set animation
        robot.div.style.animationDuration = calcAnimationLength()
        animation.innerHTML = generateAnimation()

        // Enable buttons
        start.disabled = false
        reset.disabled = false
    }
    
    start.onclick = function() {
        // add the animation to the class
        robot.div.className += " robot-animation"
    }
    
    reset.onclick = function() {
        // remove animation class by setting it to the default
        robot.div.className = "field-object"
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