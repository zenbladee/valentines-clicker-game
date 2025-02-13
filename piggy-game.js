const gameArea = document.querySelector('.game-area');

// Function to create the grid dynamically
function createGrid() {
    const gridWidth = gameArea.offsetWidth;
    const gridHeight = gameArea.offsetHeight;
    const gridSize = 50; // Each grid cell will be 50px by 50px

    const columns = Math.floor(gridWidth / gridSize);
    const rows = Math.floor(gridHeight / gridSize);

    gameArea.innerHTML = ''; // Clear any existing cells before creating the grid

    // Create the grid cells
    for (let i = 0; i < rows * columns; i++) {
        const gridCell = document.createElement('div');
        gameArea.appendChild(gridCell);
    }
}

// Call createGrid to generate the grid initially
createGrid();

// Optional: Add a window resize event to regenerate grid on resize
window.addEventListener('resize', createGrid);

// Create the player (circle) and add event listener for keyboard movement
const player = document.createElement('div');
player.classList.add('player');
gameArea.appendChild(player);

// Initial position of the player
let playerX = 0;
let playerY = 0;
const playerSpeed = 50; // Movement step in grid cells

// Function to move the player
function movePlayer(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (playerY > 0) playerY -= playerSpeed;
            break;
        case 'ArrowDown':
            if (playerY < gameArea.offsetHeight - 30) playerY += playerSpeed;
            break;
        case 'ArrowLeft':
            if (playerX > 0) playerX -= playerSpeed;
            break;
        case 'ArrowRight':
            if (playerX < gameArea.offsetWidth - 30) playerX += playerSpeed;
            break;
    }
    player.style.top = playerY + 'px';
    player.style.left = playerX + 'px';
}

// Add event listener for keyboard input (arrow keys to move player)
window.addEventListener('keydown', movePlayer);

// Create the piggy (circle)
const piggy = document.createElement('div');
piggy.classList.add('piggy');
gameArea.appendChild(piggy);

// Randomly position the piggy
function positionPiggy() {
    const maxX = gameArea.offsetWidth - 50; // Piggy width
    const maxY = gameArea.offsetHeight - 50; // Piggy height

    piggy.style.top = `${Math.floor(Math.random() * maxY)}px`;
    piggy.style.left = `${Math.floor(Math.random() * maxX)}px`;
}

positionPiggy();

// Optional: Move the piggy randomly every few seconds
setInterval(positionPiggy, 1000);

// Score tracking
let score = 0;
const scoreDisplay = document.createElement('div');
scoreDisplay.style.position = 'absolute';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '10px';
scoreDisplay.style.fontSize = '24px';
scoreDisplay.style.color = '#333';
scoreDisplay.innerText = `Score: ${score}`;
gameArea.appendChild(scoreDisplay);

// Check if player is touching the piggy
function checkCollision() {
    const piggyRect = piggy.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
        playerRect.top < piggyRect.bottom &&
        playerRect.bottom > piggyRect.top &&
        playerRect.left < piggyRect.right &&
        playerRect.right > piggyRect.left
    ) {
        score++; // Increase score
        scoreDisplay.innerText = `Score: ${score}`;
        positionPiggy(); // Move piggy to a new position
    }
}

// Check for collision every 50ms
setInterval(checkCollision, 50);