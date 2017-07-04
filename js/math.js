// We have const rawData as a json with time, x, y keys

// We will putput as x, y, rot
let output = []

const sideLength = 1;
rawData.forEach((item, index) => {
    let deltaTime, deltaTheta
    
    // Find delta time
    if (index === 0) {
        deltaTime = item.time
    }
    else {
        deltaTime = item.time - rawData[index - 1].time
    }
    
    // Calculate change of angle
    deltaTheta = (item.xVelocity - item.yVelocity) / sideLength
    output.push(deltaTheta)
});
console.log(output)

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};