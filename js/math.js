// We have const rawData as a json with time, rVel, lVel keys

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
    // Convert miliseconds to seconds
    deltaTime /= 1000
    
    // Calculate change of angle
    deltaTheta = (item.rVelocity - item.lVelocity) / sideLength
    
    // Flip the polarity because Grace Yao said so
    deltaTheta = -deltaTheta
    
    // Update global rotation
    currRotation += deltaTheta
    
    // Calculate rotation to pivot point
    if (item.rVelocity == item.lVelocity) {
        rotToPivot = item.rVelocity * deltaTime
    }
    else {
        rotToPivot = (sideLength / 2) * ((item.rVelocity + item.lVelocity) / (item.rVelocity - item.lVelocity))
    }
    
    deltaX = rotToPivot * (Math.cos(deltaTheta + currRotation) - Math.cos(currRotation))
    deltaY = rotToPivot * (Math.sin(deltaTheta + currRotation) - Math.sin(currRotation))
    
    // Negate deltas to make +Y North and +X East
    deltaX = deltaX * deltaTime
    deltaY = deltaY * deltaTime
    
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

let data = output