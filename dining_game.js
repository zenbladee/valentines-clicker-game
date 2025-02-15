const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;  // Set the width directly in JS
canvas.height = 400; // Set the height directly in JS

// Go home button:
document.getElementById("home-button").addEventListener("click", function () {
    window.location.href = "index.html";
});

// Game variables
let player = { x: 50, y: 50, size: 50 };
let money = 50;
let health = 100;
let timeLeft = 60;
let foodItems = [];
let cashItems = [];
let gameActive = false;
let timer;
let difficulty = "easy";
let enemy2Active = false;
let enemy3Active = false;

// Key controls
let keys = {};

// Load player sprite
const playerImg = new Image();
playerImg.src = "images/piggy.png";

// Load enemy sprites
const enemyImg = new Image();
enemyImg.src = "images/enemy.png";

const enemy2Img = new Image();
enemy2Img.src = "images/enemy2.png";

const enemy3Img = new Image();
enemy3Img.src = "images/enemy3.png";  // Fixed the duplicate enemy image declaration

// Enemy objects
let enemy = { x: 400, y: 300, size: 50, speed: 1 };
let enemy2 = { x: 100, y: 350, size: 50, speed: 2 };
let enemy3 = { x: 100, y: 350, size: 50, speed: 3 };

// Movement handling
window.addEventListener("keydown", (e) => { keys[e.key] = true; });
window.addEventListener("keyup", (e) => { keys[e.key] = false; });

// Update player position
function movePlayer() {
    if (keys["ArrowUp"] && player.y > 0) player.y -= 5;
    if (keys["ArrowDown"] && player.y < canvas.height - player.size) player.y += 5;
    if (keys["ArrowLeft"] && player.x > 0) player.x -= 5;
    if (keys["ArrowRight"] && player.x < canvas.width - player.size) player.x += 5;
}

// Move enemies towards the player
function moveEnemy(enemy) {
    let dx = player.x - enemy.x;
    let dy = player.y - enemy.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
        enemy.x += (dx / distance) * enemy.speed;
        enemy.y += (dy / distance) * enemy.speed;
    }
}

function checkCollisions() {
    // Check for food collisions
    foodItems.forEach((food, index) => {
        // Adjust the condition to check if the player's position intersects with the food's position
        if (Math.abs(player.x - food.x) < player.size / 2 + food.size / 2 && 
            Math.abs(player.y - food.y) < player.size / 2 + food.size / 2) {
            
            if (food.type === "good") {
                health += 10;
                message("You ate good food! +10 Health");
            } else {
                health -= 20;
                message("Bad food! -20 Health");
            }

            // Remove food from the array once it's collected
            foodItems.splice(index, 1);
        }
    });

    // Check for cash collisions
    cashItems.forEach((cash, index) => {
        // Adjust the condition to check if the player's position intersects with the cash's position
        if (Math.abs(player.x - cash.x) < player.size / 2 + cash.size / 2 && 
            Math.abs(player.y - cash.y) < player.size / 2 + cash.size / 2) {
            
            money += 10;
            message("You found cash! +$10");

            // Remove cash from the array once it's collected
            cashItems.splice(index, 1);
        }
    });
}

// Check if an enemy collides with the player
function checkEnemyCollision(enemy) {
    let enemies = [enemy, enemy2, enemy3];
    enemies.forEach((e) => {
        if (!e) return;

        let dx = player.x - e.x;
        let dy = player.y - e.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.size / 2 + e.size / 2) {
            health -= 20;
            message("Enemy touched you! -20 Health");
        }
    });
}

// Display message
function message(text) {
    const msgElement = document.getElementById("message");
    if (msgElement) {
        msgElement.innerText = text;
    } else {
        console.error("Message element not found.");
    }
}

playerImg.onload = function () {
    console.log("Player image loaded successfully!");
};
playerImg.onerror = function () {
    console.error("Error loading player image.");
};

enemyImg.onload = function () {
    console.log("Enemy image loaded successfully!");
};
enemyImg.onerror = function () {
    console.error("Error loading enemy image.");
};

enemy2Img.onload = function () {
    console.log("Enemy 2 image loaded successfully!");
};
enemy3Img.onerror = function () {
    console.error("Error loading enemy 2 image.");
};

// Update game
function updateGame() {
    if (!gameActive) return;

    // Handle player movement and check for collisions
    movePlayer();
    moveEnemy(enemy);
    checkEnemyCollision(enemy);

    // If enemy2 is active, move and check it too
    if (enemy2Active) {
        moveEnemy(enemy2);
        checkEnemyCollision(enemy2);
    }

    // If enemy3 is active, move and check it too
    if (enemy3Active) {
        moveEnemy(enemy3);
        checkEnemyCollision(enemy3);
    }

    // Check for collisions with food and cash
    checkCollisions();

    // Clear the canvas to draw the updated state
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player and enemies
    ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);
    ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.size, enemy.size);
    
    if (enemy2Active) {
        ctx.drawImage(enemy2Img, enemy2.x, enemy2.y, enemy2.size, enemy2.size);
    }

    if (enemy3Active) {
        ctx.drawImage(enemy3Img, enemy3.x, enemy3.y, enemy3.size, enemy3.size);
    }

    // Draw food items
    foodItems.forEach((food) => {
        ctx.fillStyle = food.type === "good" ? "green" : "red";
        ctx.fillRect(food.x, food.y, food.size, food.size);
    });

    // Draw cash items
    cashItems.forEach((cash) => {
        ctx.fillStyle = "gold";
        ctx.fillRect(cash.x, cash.y, cash.size, cash.size);
    });

    // Update the displayed health, money, and time left
    document.getElementById("health").innerText = health;
    document.getElementById("money").innerText = money;
    document.getElementById("time-left").innerText = timeLeft;

    // Check for end conditions
    if (health <= 0 || money < 0) {
        endGame(false);  // Trigger endGame when health or money is below acceptable levels
    }
}

function spawnCash() {
    let cashX = Math.random() * (canvas.width - 20);
    let cashY = Math.random() * (canvas.height - 20);
    cashItems.push({ x: cashX, y: cashY, size: 20 });
    console.log("Cash spawned at:", cashX, cashY);
}

// Declare spawnFood and randomEvent before using them
function spawnFood() {
    let foodX = Math.random() * (canvas.width - 20);
    let foodY = Math.random() * (canvas.height - 20);
    let foodType = Math.random() > 0.5 ? "good" : "bad";
    foodItems.push({ x: foodX, y: foodY, size: 20, type: foodType });
    console.log("Food spawned at:", foodX, foodY);
}

function randomEvent() {
    console.log("Random event triggered!");
}

// Start game function
function startGame(level) {
    gameActive = true;
    difficulty = level;
    timeLeft = level === "easy" ? 60 : level === "medium" ? 45 : 30;
    health = 100;
    money = 50;
    foodItems = [];
    cashItems = [];
    player.x = 50;
    player.y = 50;

    // Reset enemy positions
    enemy.x = 400;
    enemy.y = 300;
    enemy2Active = (difficulty === "medium");
    enemy3Active = (difficulty === "hard");

    if (enemy2Active) {
        enemy2.x = 100;
        enemy2.y = 350;
    }

    if (enemy3Active) {
        enemy3.x = 300;
        enemy3.y = 200;
    }

    clearInterval(timer);

    // Start game timer
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft % 10 === 0) randomEvent();
        if (timeLeft <= 0) endGame(true);
    }, 1000);

    // Decrease health every 5 seconds
    setInterval(() => {
        if (gameActive) {
            health -= 5;
            message("-5 Health over time");
        }
    }, 5000);

    // Spawn food and cash periodically
    setInterval(spawnFood, 3000);
    setInterval(spawnCash, 10000);
    setInterval(updateGame, 50);
}

// End game function
function endGame(win) {
    gameActive = false;
    clearInterval(timer);
    if (win) {
        message("You survived!");
    } else {
        message("Game Over!");
    }
    // Optionally, clear out all objects (food and cash) from the screen
    foodItems = [];
    cashItems = [];
    clearInterval(timer);
    clearInterval(spawnFoodInterval);
    clearInterval(spawnCashInterval);
    clearInterval(healthInterval);
}


// Go home function
function goHome() {
    window.location.href = "index.html";
}
