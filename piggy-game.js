const player = document.querySelector('.player');
const piggy = document.querySelector('.piggy');
let playerPosition = { x: 0, y: 0 };

// Set up grid size
const gridSize = 50; // Change this to make the grid more or less fine
const gameArea = document.querySelector('.game-area');

// Move the player based on arrow keys, but make it follow the grid
document.addEventListener('keydown', (e) => {
    const gameAreaWidth = gameArea.offsetWidth;
    const gameAreaHeight = gameArea.offsetHeight;

    // Moving up (y decreases)
    if (e.key === 'ArrowUp' && playerPosition.y > 0) {
        playerPosition.y -= gridSize;
    }
    // Moving down (y increases)
    if (e.key === 'ArrowDown' && playerPosition.y < gameAreaHeight - gridSize) {
        playerPosition.y += gridSize;
    }
    // Moving left (x decreases)
    if (e.key === 'ArrowLeft' && playerPosition.x > 0) {
        playerPosition.x -= gridSize;
    }
    // Moving right (x increases)
    if (e.key === 'ArrowRight' && playerPosition.x < gameAreaWidth - gridSize) {
        playerPosition.x += gridSize;
    }

    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;
});

// Move the piggy randomly within the grid
function movePiggy() {
    const gameAreaWidth = gameArea.offsetWidth;
    const gameAreaHeight = gameArea.offsetHeight;

    const randomX = Math.floor(Math.random() * (gameAreaWidth / gridSize)) * gridSize;
    const randomY = Math.floor(Math.random() * (gameAreaHeight / gridSize)) * gridSize;

    piggy.style.left = `${randomX}px`;
    piggy.style.top = `${randomY}px`;
}

// Call the movePiggy function every 2 seconds
setInterval(movePiggy, 2000);