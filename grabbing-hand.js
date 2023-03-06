// Set up the canvas element
const canvas = document.createElement('canvas');
canvas.classList.add("row");
canvas.width = document.getElementById("grabbing-hand").offsetWidth;
canvas.height = document.getElementById("grabbing-hand").offsetHeight;
document.getElementById("grabbing-hand").appendChild(canvas);

// Get the canvas context
const ctx = canvas.getContext('2d');
// change z index of canvas
canvas.style.zIndex = 10;
const maxArmLength = canvas.height * 3 - 50;

// Set up the arm properties
const baseArmLength = 100;
let armLength = baseArmLength;
const armThickness = 20;
const anchorX = canvas.width / 2;
const anchorY = canvas.height / 8;

// Set up the animation loop
let armSpeed = 0.01;
let minArmAngle = 0;
let maxArmAngle = 3;
let armAngle = minArmAngle;
let armDirection = 1; // 1 for moving from left to right, -1 for moving from right to left
let isGrabbing = false;

function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the arm's endpoint
    const endpointX = anchorX + armLength * Math.cos(armAngle);
    const endpointY = anchorY + armLength * Math.sin(armAngle);

    // Draw the arm
    ctx.beginPath();
    ctx.lineWidth = armThickness;
    ctx.moveTo(anchorX, anchorY);
    ctx.lineTo(endpointX, endpointY);
    ctx.stroke();

    // Update the arm angle for the next frame
    armAngle += armSpeed * armDirection;
    // Reverse direction if the arm goes beyond the allowed range of angles
    if (armAngle < minArmAngle || armAngle > maxArmAngle) {
        armDirection *= -1;
        armAngle = Math.max(minArmAngle, Math.min(maxArmAngle, armAngle));
    }

    // Request the next animation frame
    requestAnimationFrame(animate);
}
let extendingDirection = 1;
let hasExtended = false;
function grabAnimation() {
    if(!isGrabbing) return;
    armSpeed = 0;
    let extension = 2 * extendingDirection;
    // Increase the length of the arm to simulate grabbing after each second
    if (armLength < maxArmLength && armLength >= baseArmLength) {
        armLength += extension;
    }
    if(armLength >= maxArmLength - 10 && !hasExtended) {
        extendingDirection = -1;
        hasExtended = true;
    }
    if(armLength <= baseArmLength + 10 && hasExtended) {
        extendingDirection = 1;
        hasExtended = false;
        isGrabbing = false;
        armSpeed = 0.01;
    }
    requestAnimationFrame(grabAnimation)
    // Stop the animation after 1 second
}

function pickup() {
    if(isGrabbing) return;
    isGrabbing = true;
    grabAnimation();
}

// Start the animation loop
animate();

