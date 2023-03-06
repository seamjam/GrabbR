// Set up the canvas element


    let handCanvas = document.createElement('canvas');
    handCanvas.classList.add("row");
    handCanvas.width = document.getElementById("grabbing-hand").offsetWidth;
    handCanvas.height = document.getElementById("grabbing-hand").offsetHeight;
    document.getElementById("grabbing-hand").appendChild(handCanvas);

// Get the canvas context
    const ctx = handCanvas.getContext('2d');
// change z index of canvas
    handCanvas.style.zIndex = 10;
    const maxArmLength = handCanvas.height * 3 - 50;

    // Set up the arm properties
    const baseArmLength = 100;
    let armLength = baseArmLength;
    const armThickness = 20;
    const anchorX = handCanvas.width / 2;
    const anchorY = handCanvas.height / 8;

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
    let grabbedElement = null;

    function animate() {
        // Clear the canvas
        ctx.clearRect(0, 0, handCanvas.width, handCanvas.height);

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

        // Check for collision with elements of a certain class
        const elements = document.getElementsByClassName("bot");
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const rect = element.getBoundingClientRect();
            if (endpointX >= rect.left && endpointX <= rect.right &&
                endpointY >= rect.top && endpointY <= rect.bottom) {
                console.log("Grabbed element", element);
                grabbedElement = element;
                break;
            }
        }

        //Request the next animation frame
        requestAnimationFrame(animate);}


    let extendingDirection = 1;
    let hasExtended = false;

    function grabAnimation() {
        if (!isGrabbing) return;
        armSpeed = 0;
        let extension = 2 * extendingDirection;
        // Increase the length of the arm to simulate grabbing after each second
        if (armLength < maxArmLength && armLength >= baseArmLength) {
            armLength += extension;
        }
        if (armLength >= maxArmLength - 10 && !hasExtended) {
            extendingDirection = -1;
            hasExtended = true;
        }
        if (armLength <= baseArmLength + 10 && hasExtended) {
            extendingDirection = 1;
            hasExtended = false;
            isGrabbing = false;
            armSpeed = 0.01;
        }
        requestAnimationFrame(grabAnimation)
        // Stop the animation after 1 second
    }

    function pickup() {
        if (isGrabbing) return;
        isGrabbing = true;
        grabAnimation();
    }

// Start the animation loop
    animate();

