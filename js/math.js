// We have const rawData as a json with time, x, y keys

// We will putput as x, y, rot
let output = []
let currRotation = currX = currY = 0
const sideLength = 1
rawData.forEach((item, index) => {
    let deltaTime, deltaTheta, rotToPivot, deltaX, deltaY
    
    // Find delta time
    if (index === 0) {
        deltaTime = item.time
    }
    else {
        deltaTime = item.time - rawData[index - 1].time
    }
    
    // Calculate change of angle
    deltaTheta = (item.rVelocity - item.lVelocity) / sideLength
    
    // Flip the polarity because Grace Yao said so
    deltaTheta = -deltaTheta
    
    // Update global rotation
    currRotation += deltaTheta
    
    // Rotation degrees to 
    if (item.rVelocity == item.lVelocity) {
        rotToPivot = item.rVelocity * deltaTime
    }
    rotToPivot = (sideLength / 2) * ((item.rVelocity + item.lVelocity) / (item.rVelocity - item.lVelocity))
    
    deltaX = rotToPivot * (Math.cos(deltaTheta + currRotation) - Math.cos(currRotation))
    deltaY = rotToPivot * (Math.sin(deltaTheta + currRotation) - Math.sin(currRotation))
    
    // Negate deltas to make +Y North and +X East
    deltaX = -deltaX
    deltaY = -deltaY
    
    // Update global positions
    currX += deltaX
    currY += deltaY
    
    output.push({
        "rot" : currRotation,
        "x" : currX,
        "y" : currY
    })
});
console.log(output)