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
        [250.0, 250.0, 90.0],
        [250.0, 262.7222269303203, 90.0],
        [250.0, 275.44445386064064, 90.0],
        [250.0, 288.1666807909609, 90.0],
        [250.0, 300.88890772128127, 90.0],
        [250.0, 313.61113465160156, 90.0],
        [250.0, 326.3333615819219, 90.0],
        [250.0, 339.0555885122422, 90.0],
        [250.0, 351.77781544256254, 90.0],
        [250.0, 364.50004237288283, 90.0],
        [204.57643129604108, 367.67802376377495, 86.00591894081906],
        [159.4845423058658, 374.01219354535186, 82.0118378816381],
        [161.25253108242202, 386.6109741908167, 82.0118378816381],
        [163.02051985897822, 399.2097548362815, 82.0118378816381],
        [164.78850863553444, 411.8085354817463, 82.0118378816381],
        [166.55649741209066, 424.4073161272111, 82.0118378816381],
        [168.32448618864686, 437.00609677267596, 82.0118378816381],
        [170.09247496520308, 449.60487741814075, 82.0118378816381],
        [171.8604637417593, 462.20365806360553, 82.0118378816381],
        [173.6284525183155, 474.8024387090704, 82.0118378816381],
        [175.39644129487172, 487.4012193545352, 82.0118378816381],
        [177.16443007142794, 500.0, 82.0118378816381]
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
    let rot = data[2] - 90
    return `${currPercent}% {
    transform:
        translate(${x}px, ${y}px)
        rotate(${rot}deg);
}
`
}
