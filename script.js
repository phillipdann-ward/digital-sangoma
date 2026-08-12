document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('beachcomber-container');
    const throwButton = document.getElementById('throw-button');

    // Array of your regular item image paths for bones and shells
    const regularItemImages = [
        'images/bone1.png',
        'images/bone2.png',
        'images/bone3.png',
        // Add more paths to your bone and shell images here!
    ];

    // The special item
    const specialItemImage = 'images/areatsrs.png';
    const specialItemProbability = 0.3; // chance for the special item to appear
    const specialItemSizeMultiplier = 1.5; // Make the special item a bit smaller or bigger

    const numberOfRegularItemsToThrow = 14; // We'll throw one less regular item if the special one appears

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

        let hasSpecialItemAppeared = false;
        if (Math.random() < specialItemProbability) {
            hasSpecialItemAppeared = true;
        }

        // Determine total items to throw, accounting for the special item
        const totalItemsToThrow = hasSpecialItemAppeared ? numberOfRegularItemsToThrow + 1 : numberOfRegularItemsToThrow;

        let specialItemAdded = false;

        for (let i = 0; i < totalItemsToThrow; i++) {
            const img = document.createElement('img');
            img.classList.add('item');

            let currentImageSrc;
            let currentSize;

            // Decide if this iteration should be the special item
            // Only if it's supposed to appear AND hasn't been added yet
            if (hasSpecialItemAppeared && !specialItemAdded && i === getRandomInt(0, totalItemsToThrow - 1)) {
                currentImageSrc = specialItemImage;
                currentSize = getRandomInt(50, 150) * specialItemSizeMultiplier; // Make it larger
                specialItemAdded = true; // Mark as added
            } else {
                currentImageSrc = regularItemImages[getRandomInt(0, regularItemImages.length - 1)];
                currentSize = getRandomInt(50, 150);
            }

            img.src = currentImageSrc;
            img.style.width = `${currentSize}px`;
            img.style.height = 'auto'; // Maintain aspect ratio

            // Random position within the container
            // We subtract size to ensure the whole image is visible
            const posX = getRandomInt(0, containerWidth - currentSize);
            const posY = getRandomInt(0, containerHeight - currentSize);
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
