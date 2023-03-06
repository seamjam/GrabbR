// Set up the canvas element
const canvas = document.createElement('canvas');
canvas.classList.add("row");
canvas.width = document.getElementById("grabbing-hand").offsetWidth;
canvas.height = document.getElementById("grabbing-hand").offsetHeight;
document.getElementById("grabbing-hand").appendChild(canvas);

// Get the canvas context
const ctx = canvas.getContext('2d');

// Set up the arm properties
let armLength = 100;
const armThickness = 20;
const anchorX = canvas.width / 2;
const anchorY = canvas.height / 8;

//set up the hand properties
const Handwidth = 100; // adjust to desired width
const Handheight = 50; // adjust to desired height
const borderWidth = 10; // adjust to desired border width



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

    //Draw the hand
    ctx.beginPath();
    let angleOffset = armAngle - 45;
    ctx.arc(endpointX, endpointY, 50, 0 + angleOffset, Math.PI + angleOffset, true); // draw the top half of a circle
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = "black";
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

function grabAnimation() {
    armSpeed = 0;
    // Increase the length of the arm to simulate grabbing after each second
    if (armLength < 200) {
        armLength += 1;
    }
    requestAnimationFrame(grabAnimation)
    // Stop the animation after 1 second
    setTimeout(function () {
        isGrabbing = false;
        armSpeed = 0.01;
    }, 1000);
}

function pickup() {
    if(isGrabbing) return;
    isGrabbing = true;
    grabAnimation();
}



// Start the animation loop
animate();
