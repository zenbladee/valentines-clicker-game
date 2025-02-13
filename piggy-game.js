let score = 0;
let player = document.getElementById("player");
let piggy = document.getElementById("piggy");
let scoreDisplay = document.getElementById("score");
let gameArea = document.getElementById("gameArea");

// Player initial position
let playerX = 50;
let playerY = 50;

// Set initial position of the player
function setPlayerPosition() {
    player.style.left = `${playerX}%`;
    player.style.top = `${playerY}%`;
}

// Set initial position of the piggy
function setPiggyPosition() {
    let piggyX = Math.random() * 90; // Random X position for the piggy
    let piggyY = Math.random() * 90; // Random Y position for the piggy
    piggy.style.left = `${piggyX}%`;
    piggy.style.top = `${piggyY}%`;
}

// Function to check collision between player and piggy
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const piggyRect = piggy.getBoundingClientRect();

    if (playerRect.top < piggyRect.bottom &&
        playerRect.bottom > piggyRect.top &&
        playerRect.left < piggyRect.right &&
        playerRect.right > piggyRect.left) {
        score++; // Increase score if they collide
        scoreDisplay.innerText = score;
        setPiggyPosition(); // Move the piggy after a successful catch
    }
}

// Move the player with arrow keys
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && playerY > 0) {
        playerY -= 1;
    } else if (event.key === "ArrowDown" && playerY < 90) {
        playerY += 1;
    } else if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 1;
    } else if (event.key === "ArrowRight" && playerX < 90) {
        playerX += 1;
    }
    setPlayerPosition(); // Update player’s position on the game area
    checkCollision(); // Check if the player catches the piggy
});

// Set initial positions for the player and the piggy
setPlayerPosition();
setPiggyPosition();