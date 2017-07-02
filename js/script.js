// Cache DOM objects to js var
const robot = document.getElementById("robot")
const animation = document.getElementById("animation")
    // Buttons
const generate = document.getElementById("generate")
const start = document.getElementById("start")
const reset = document.getElementById("reset")
    // Generate animation button
generate.onclick = function () {
    // Set animation
    animation.innerHTML = generateAnimation()
    // Enable buttons
    start.disabled = false;
    reset.disabled = false;
}
start.onclick = function () {
    robot.className = "robot-animation"
}
reset.onclick = function () {
    robot.className = ""
}

function generateAnimation() {
    let animationData = `
        0% {
            transform: translateY(0rem);
        }
        100% {
            transform: translateY(10rem);
        }
    `
    console.log("Animation data generated")
    console.log(animationData)
    return `@keyframes robot {${animationData}}`
}