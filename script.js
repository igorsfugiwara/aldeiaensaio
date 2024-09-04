document.addEventListener('DOMContentLoaded', function () {
    const ring = document.getElementById('ring');
    const ringSizeDisplay = document.getElementById('ringSize');
    const diameterValue = document.getElementById('diameterValue');
    const decreaseButton = document.getElementById('decreaseButton');
    const increaseButton = document.getElementById('increaseButton');
    const ruler = document.getElementById('ruler');
    const sizeRange = document.getElementById('sizeRange');

    // Function to draw the ruler with size markers
    function drawRuler() {
        for (let i = 10; i <= 39; i++) {
            const mark = document.createElement('div');
            ruler.appendChild(mark);
        }
    }

    // Function to convert ring size to physical diameter in millimeters
    function getDiameter(size) {
        // Convert ring sizes to physical diameters in millimeters
        const diametersInMillimeters = {
            10: 15.90, 11: 16.50, 12: 17.10, 13: 17.70, 14: 18.10, 15: 18.90, 16: 19.50,
            17: 20.10, 18: 20.70, 19: 21.30, 20: 22.10, 21: 22.70, 22: 23.30, 23: 23.90,
            24: 24.50, 25: 25.10, 26: 25.70, 27: 26.30, 28: 26.90, 29: 27.50, 30: 28.10,
            31: 28.70, 32: 29.30, 33: 29.90, 34: 30.50, 35: 31.10, 36: 31.70, 37: 32.30,
            38: 32.90, 39: 33.50
        };
        return diametersInMillimeters[size] || 0;
    }

    // Update ring size and diameter display
    function updateRingSize(size) {
        const ringDiameter = getDiameter(size); // Get the diameter corresponding to the ring size
        const ringSize = ringDiameter / 10; // Convert diameter from mm to cm for visual consistency
        ringSizeDisplay.textContent = size;
        ring.style.width = `${ringSize}cm`; // Set ring size in cm
        ring.style.height = `${ringSize}cm`; // Set ring size in cm
        diameterValue.textContent = `${ringDiameter.toFixed(2)} mm`; // Display diameter in mm
        ruler.style.width = `${ringSize}cm`; // Adjust ruler width to match ring size
        ruler.innerHTML = ''; // Clear the ruler before redrawing
        drawRuler(); // Draw the ruler with updated size
    }

    // Event listener for the decrease button
    decreaseButton.addEventListener('click', function () {
        const currentSize = parseInt(ringSizeDisplay.textContent);
        if (currentSize > 10) {
            updateRingSize(currentSize - 1);
            sizeRange.value = currentSize - 1; // Update the range slider value
        }
    });

    // Event listener for the increase button
    increaseButton.addEventListener('click', function () {
        const currentSize = parseInt(ringSizeDisplay.textContent);
        if (currentSize < 39) {
            updateRingSize(currentSize + 1);
            sizeRange.value = currentSize + 1; // Update the range slider value
        }
    });

    // Event listener for the size range input
    sizeRange.addEventListener('input', function () {
        updateRingSize(parseInt(sizeRange.value));
        ringSizeDisplay.textContent = sizeRange.value; // Update the displayed ring size
    });

    // Initialize with default ring size
    updateRingSize(16);

    // Handle mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const menu = document.querySelector('nav ul');

    mobileMenu.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
        menu.classList.toggle('active');
    });
});