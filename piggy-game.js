let score = 0;
let player = document.getElementById("player");
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");

// Player initial position
let playerX = 50;
let playerY = 50;

// Set the initial position of the player
function setPlayerPosition() {
    player.style.left = `${playerX}%`;
    player.style.top = `${playerY}%`;
}

// Create the piggy to be caught by the player
function generatePiggy() {
    let piggy = document.createElement("div");
    piggy.className = "clickable-piggy";
    piggy.style.top = `${Math.random() * 90}%`;
    piggy.style.left = `${Math.random() * 90}%`;

    // Check if the player touches the piggy
    piggy.addEventListener("click", function () {
        score++;
        scoreDisplay.innerText = score;
        piggy.remove(); // Remove piggy after it’s caught
        generatePiggy(); // Generate a new piggy
    });

    gameArea.appendChild(piggy);
}

// Move the player using arrow keys
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
});

// Start the game by generating the first piggy
generatePiggy();
setPlayerPosition(); // Set the player’s initial position