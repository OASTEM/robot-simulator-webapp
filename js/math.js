// We have const rawData as a json with time, rVel, lVel keys

function doMath(data) {
    // We will putput as x, y, rot
    let output = []
    let currRotation = currX = currY = 0
    let sideLength = robotWidth
    data.forEach((item, index) => {
        let deltaTime, deltaTheta, rotToPivot, deltaX, deltaY, radRotation

        // Find delta time
        if (index === 0) {
            deltaTime = item.time
        }
        else {
            deltaTime = item.time - data[index - 1].time
        }
        // Convert miliseconds to seconds
        deltaTime /= 1000

        // Calculate change of angle
        deltaTheta = (item.rVelocity - item.lVelocity) / sideLength

        // Flip the polarity because Grace Yao said so
        deltaTheta = -deltaTheta

        // Update global rotation
        currRotation += deltaTheta

        if (item.rVelocity === item.lVelocity) {
            rotToPivot = item.rVelocity
            radRotation = currRotation * Math.PI / 180
            deltaX = rotToPivot * Math.cos(radRotation)
            deltaY = rotToPivot * Math.sin(radRotation)
        }
        else {
            rotToPivot = (sideLength / 2) * ((item.rVelocity + item.lVelocity) / (item.rVelocity - item.lVelocity))
            radRotation = currRotation * Math.PI / 180
            deltaY = rotToPivot * (Math.sin(deltaTheta + radRotation) - Math.sin(radRotation))
            deltaX = rotToPivot * (Math.cos(deltaTheta + radRotation) - Math.cos(radRotation))
        }

        // Multiply by time
        deltaX *= deltaTime
        deltaY *= deltaTime

        // Update global positions
        currX += deltaX
        currY += deltaY

        output.push({
            "rot" : currRotation,
            "x" : currX,
            "y" : currY
        })
    })
    return output
}