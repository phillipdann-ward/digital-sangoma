document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('beachcomber-container');
    const throwButton = document.getElementById('throw-button');

    // Array of your image paths for bones and shells
    const itemImages = [
        'images/bone1.png',
        'images/bone2.png',
        'images/bone3.png',
        // Add more paths to your bone and shell images here!
    ];

    const numberOfItemsToThrow = 15; // How many items to throw each time

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    function throwItems() {
        // Clear existing items first
        container.innerHTML = '';

        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        for (let i = 0; i < numberOfItemsToThrow; i++) {
            const img = document.createElement('img');
            img.src = itemImages[getRandomInt(0, itemImages.length - 1)];
            img.classList.add('item');

            // Random size (e.g., 50px to 150px)
            const size = getRandomInt(50, 150);
            img.style.width = `${size}px`;
            img.style.height = 'auto'; // Maintain aspect ratio

            // Random position within the container
            // We subtract size to ensure the whole image is visible
            const posX = getRandomInt(0, containerWidth - size);
            const posY = getRandomInt(0, containerHeight - size);
            img.style.left = `${posX}px`;
            img.style.top = `${posY}px`;

            // Random rotation
            const rotation = getRandomInt(0, 360);
            img.style.transform = `rotate(${rotation}deg)`;

            container.appendChild(img);

            // Add animation classes after a short delay to trigger CSS transition
            setTimeout(() => {
                img.classList.add('entering');
                setTimeout(() => {
                    img.classList.remove('entering');
                    img.classList.add('entered');
                }, 10); // A very short delay to ensure 'entering' is applied first
            }, i * 50); // Stagger the entry of items slightly
        }
    }

    // Initial throw when the page loads
    throwItems();

    // Event listener for the button
    throwButton.addEventListener('click', throwItems);
});