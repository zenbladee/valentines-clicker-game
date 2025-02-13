let score = 0;
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");

function generatePiggy() {
    // Clear the previous piggy
    gameArea.innerHTML = "";

    // Create a new clickable piggy
    let piggy = document.createElement("div");
    piggy.className = "clickable-piggy";
    piggy.style.top = `${Math.random() * 90}%`;  // Random position on the screen
    piggy.style.left = `${Math.random() * 90}%`;

    piggy.addEventListener("click", function () {
        score++;
        scoreDisplay.innerText = score;
        generatePiggy();  // Generate a new piggy after one is clicked
    });

    gameArea.appendChild(piggy);
}

// Start the game by generating the first piggy
generatePiggy();