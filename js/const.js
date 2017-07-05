/* 
    CHANGE canvasSize TO CHANGE SCALING OF PROGRAM
*/
const canvasSize = 100 // units

// Same with robot size and location in units as defined above
const robotWidth = 0.6858 // unit (27 inches)
const robotHeight = 0.8382 // units (33 inches)

// Robot x - y is 
const robotStartX = 0 // units
const robotStartY = 0 // units

// Cache DOM objects to js var
const robotCanvas = document.getElementById("robot-canvas")
const animation = document.getElementById("animation")

// Buttons
const input = document.getElementById("input")
const generate = document.getElementById("generate")
const start = document.getElementById("start")
const reset = document.getElementById("reset")

// This is the actual size in px
// We use the _actual_ canvasHeight to scale to the canvasSize of x supposed units
// This is not a const because will change if window is resized
let canvasHeight = document.getElementById("robot-canvas").getBoundingClientRect().height