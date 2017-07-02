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
    const data = ["transform: translateY(0rem)", "transform: translateY(10rem)"]
    let animationData = dataToCssAnimation(data)
    console.log("Animation data generated")
    console.log(animationData)
    return `@keyframes robot {${animationData}}`
}

function dataToCssAnimation(data) {
    let numDataPoints = data.length
    let percentDiff = 100 / numDataPoints
    let currPercent = 0
    let animationData = ``
    data.forEach(function(d) {
        animationData += addCssRow(d, currPercent)
        currPercent += percentDiff
    })
    return animationData
}

function addCssRow(data, currPercent) {
    return `${currPercent}% {
    ${data}
}
`
}