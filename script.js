document.addEventListener('DOMContentLoaded', function () {
    const ring = document.getElementById('ring');
    const ringSizeDisplay = document.getElementById('ringSize');
    const diameterValue = document.getElementById('diameterValue');
    const decreaseButton = document.getElementById('decreaseButton');
    const increaseButton = document.getElementById('increaseButton');
    const ruler = document.getElementById('ruler');
    const sizeRange = document.getElementById('sizeRange');

    // Function to estimate the pixels per inch (PPI) of the screen
    function getScreenPPI() {
        // Logical (CSS) width and height of the screen
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        // Physical width and height in pixels
        const physicalWidth = screenWidth * window.devicePixelRatio;
        const physicalHeight = screenHeight * window.devicePixelRatio;

        // Estimated diagonal size of the screen in inches
        const diagonalSizeInInches = 15; // Generic estimate, can be adjusted based on device

        // Calculate the diagonal of the screen in physical pixels
        const diagonalInPixels = Math.sqrt(Math.pow(physicalWidth, 2) + Math.pow(physicalHeight, 2));

        // Estimate pixels per inch (PPI)
        const ppi = diagonalInPixels / diagonalSizeInInches;

        return ppi;
    }

    // Log the estimated screen PPI to the console
    console.log("Estimated Screen PPI:", getScreenPPI());

    // Function to draw the ruler with size markers
    function drawRuler() {
        const step = 100 / (35 - 7); // Step size for each marker on the ruler
        for (let i = 7; i <= 35; i++) {
            const mark = document.createElement('div');
            mark.classList.add('mark');
            mark.style.left = `${(i - 7) * step}%`; // Set the position of each marker on the ruler
            ruler.appendChild(mark);
        }
    }

    // Function to convert the ring size to physical diameter in millimeters
    function getDiameter(size) {
        // Convert ring sizes to physical diameters in millimeters
        const diametersInMillimeters = {
            7: 14.96, 8: 15.56, 9: 16.16, 10: 16.76, 11: 17.36, 12: 17.96, 13: 18.56,
            14: 19.16, 15: 19.76, 16: 20.36, 17: 20.96, 18: 21.56, 19: 22.16, 20: 22.76,
            21: 23.36, 22: 23.96, 23: 24.56, 24: 25.16, 25: 25.76, 26: 26.36, 27: 26.96,
            28: 27.56, 29: 28.16, 30: 28.76, 31: 29.36, 32: 29.96, 33: 30.56, 34: 31.16,
            35: 31.76
        };
        return diametersInMillimeters[size];
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
        if (currentSize > 7) {
            updateRingSize(currentSize - 1);
            sizeRange.value = currentSize - 1; // Update the range slider value
        }
    });

    // Event listener for the increase button
    increaseButton.addEventListener('click', function () {
        const currentSize = parseInt(ringSizeDisplay.textContent);
        if (currentSize < 35) {
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
