// Cache DOM objects to js var
const robot = document.getElementById("robot")
const animation = document.getElementById("animation")

// Buttons
const generate = document.getElementById("generate")
const start = document.getElementById("start")
const reset = document.getElementById("reset")

main()

function main() {
    setButtons()
}

function setButtons() {
    generate.onclick = function () {
        // Set animation
        animation.innerHTML = generateAnimation()

        // Enable buttons
        start.disabled = false
        reset.disabled = false
    }
    
    start.onclick = function () {
        robot.className = "robot-animation"
    }
    
    reset.onclick = function () {
        robot.className = ""
    }
}

function generateAnimation() {
    // x, y, rot
    const data = [
        [0, 0, 0],
        [0, 0, 45],
        [100, 100, 45],
        [100, 100, 0],
        [100, 300, 0]
    ]
    let animationData = dataToCssAnimation(data)
    console.log("Animation data generated")
    console.log(animationData)
    return `@keyframes robot {${animationData}}`
}

function dataToCssAnimation(data) {
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
    let x = data[0]
    // negative y so Y becomes upward motion rather than downwards
    let y = -data[1]
    let rot = data[2]
    return `${currPercent}% {
    transform:
        translate(${x}px, ${y}px)
        rotate(${rot}deg);
}
`
}