// =====================
// Load Saved Data
// =====================
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let multiplier = localStorage.getItem("multiplier") ? parseInt(localStorage.getItem("multiplier")) : 1;

// =====================
// Element References
// =====================
const scoreDisplay = document.getElementById("score");
const clickerButton = document.getElementById("clicker-button");

// Reset Popup Elements
const resetButton = document.getElementById("reset-button");
const confirmResetButton = document.getElementById("confirm-reset-button");
const cancelResetButton = document.getElementById("cancel-reset-button");
const resetPopup = document.getElementById("reset-popup");

// Award Popup Elements
const awardPopup = document.getElementById("award-popup");
const awardMessage = document.getElementById("award-message");

// Other UI Elements
const motivationalMessage = document.getElementById("motivational-message");

// Home Button Handling
const homeButton = document.getElementById("home-button");
if (homeButton) {
    homeButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

// =====================
// Reset Score Handlers
// =====================

function handleResetButtonClick() {
    console.log("Reset Button Clicked");
    resetPopup.style.display = "block";  
    resetPopup.classList.remove("reset-popup-hidden"); 
}

function handleConfirmResetButtonClick() {
    console.log("Confirm Reset Button Clicked");
    
    // Reset values
    score = 0;
    multiplier = 1;

    // Save reset values
    localStorage.setItem("score", score);
    localStorage.setItem("multiplier", multiplier);

    // Update UI
    scoreDisplay.textContent = score;

    // Hide popup
    resetPopup.classList.add("reset-popup-hidden");
    resetPopup.style.display = "none";
}

function handleCancelResetButtonClick() {
    console.log("Cancel Reset Button Clicked");

    // Hide popup
    resetPopup.classList.add("reset-popup-hidden");
    resetPopup.style.display = "none";
}

// =====================
// Event Listeners
// =====================
resetButton.addEventListener("click", handleResetButtonClick);
confirmResetButton.addEventListener("click", handleConfirmResetButtonClick);
cancelResetButton.addEventListener("click", handleCancelResetButtonClick);

// Display saved score
scoreDisplay.textContent = score;

// =====================
// Clicker Game Logic
// =====================

clickerButton.addEventListener("click", () => {
    score += multiplier;
    scoreDisplay.textContent = score;

    // Save score to localStorage
    localStorage.setItem("score", score);
    localStorage.setItem("multiplier", multiplier);

    checkMilestones();
    showMotivationalMessage();
});

// =====================
// Award & Milestone Handlers
// =====================

function checkMilestones() {
    if (score === 50) {
        unlockAward("You got this!");
    } else if (score === 100) {
        unlockAward("Unlocked New Cursor! 🔥");
    } else if (score.toString().includes("143")) {
        unlockAward("I Love You ❤️");
        showHearts(); // Trigger falling hearts
    } else if (score === 100) {
        unlockAward("Unlocked Heart Cursor");
    } else if (score >= 200 && multiplier === 1) {
        unlockAward("2x Multiplier Unlocked!");
        multiplier = 2;
        localStorage.setItem("multiplier", multiplier);
    } else if (score >= 350 && multiplier == 2) {
        unlockAward("3x Multiplier Unlocked!");
        multiplier = 3;
        localStorage.setItem("multiplier", multiplier);
    } else if (score == 400 || score == 401 || score === 403) {
        unlockAward("Unlocked Cursor.");
    } else if (score >= 750 && multiplier == 3) {
        unlockAward("5x Multiplier Unlocked!");
        multiplier = 5;
        localStorage.setItem("multiplier", multiplier);
    } else if (score >= 2500 && multiplier == 5) {
        unlockAward("7x Multiplier Unlocked!");
        multiplier = 7;
        localStorage.setItem("multiplier", multiplier);
    } else if (score >= 5000 && multiplier == 7) {
        unlockAward("10x Multiplier Unlocked!");
        multiplier = 10;
        localStorage.setItem("multiplier", multiplier);
    }
}

function unlockAward(message) {
    awardMessage.textContent = message;
    awardPopup.style.display = "block";

    setTimeout(() => {
        awardPopup.style.display = "none";
    }, 4500);
}

// =====================
// Motivational Messages
// =====================

function showMotivationalMessage() {
    if (Math.random() < 0.03) {
        motivationalMessage.classList.remove("hidden");
        setTimeout(() => {
            motivationalMessage.classList.add("hidden");
        }, 1000);
    }
}

// =====================
// Falling Hearts Feature
// =====================

const heartContainer = document.createElement("div");
heartContainer.classList.add("heart-container");
document.body.appendChild(heartContainer);

function showHearts() {
    let heartCount = 100;
    clickerButton.textContent = "Click Hearts!";

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerHTML = "❤️";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = (Math.random() * 3 + 2) + "s";

            heart.addEventListener("click", () => {
                score += 20;
                scoreDisplay.textContent = score;
                localStorage.setItem("score", score);
                heart.remove();
                heartCount--;

                if (document.querySelectorAll(".heart").length === 0) {
                    clickerButton.textContent = "Click Me!";
                }
            });

            heartContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
                heartCount--;

                if (heartCount === 0) {
                    clickerButton.textContent = "Click Me!";
                }
            }, 7000);
        }, i * 100);
    }
}

// Cursor Selection Popup Elements
const cursorButton = document.getElementById("cursor-button");
const cursorPopup = document.getElementById("cursor-popup");
const closeCursorPopup = document.getElementById("close-cursor-popup");
const cursorOptions = document.getElementById("cursor-options");

console.log(cursorButton);
const availableCursors = [
    { name: "Default", url: "default" },
    { name: "Pointer", url: "pointer", unlockAt: 100 },
    { name: "Heart", url: "images/heart.cur", unlockAt: 143 },
    { name: "Bowtie", url: "images/bowtie.cur", unlockAt: 400 },
    { name: "Space", url: "images/space.cur", unlockAt: 750 },
    { name: "Big Bowtie", url: "images/bbowtie.cur", unlockAt: 1000 },
    { name: "Fish", url: "images/fish.cur", unlockAt: 1500 },
    { name: "Burger", url: "images/burger.cur", unlockAt: 2500 },
    { name: "Chicken", url: "images/chicken.cur", unlockAt: 5000 },
    { name: "Elden Ring", url: "images/eldenring.cur", unlockAt: 7500 },
    { name: "Lego", url: "images/lego.cur", unlockAt: 10000 },
    
];

console.log("Testing heart image:", new Image().src = "images/heart.cur");
console.log("Testing bowtie image:", new Image().src = "images/bowtie.cur");
console.log("Testing big bowtie image:", new Image().src = "images/bbowtie.cur");
console.log("Testing space image:", new Image().src = "images/space.cur");
console.log("Testing lego image:", new Image().src = "images/lego.cur");
console.log("Testing burger image:", new Image().src = "images/burger.cur");

let selectedCursor = localStorage.getItem("selectedCursor") || "default";

// Show the cursor selection popup
cursorButton.addEventListener("click", () => {
    console.log("Cursor button was clicked");
    updateCursorOptions();
    cursorPopup.style.display = "block";
});

// Close the popup
closeCursorPopup.addEventListener("click", () => {
    cursorPopup.style.display = "none";
});

// Update cursor options based on score
function updateCursorOptions() {
    cursorOptions.innerHTML = "";  // Clear previous options

    availableCursors.forEach(cursor => {
        console.log(`Checking cursor: ${cursor.name}, Unlock at: ${cursor.unlockAt}, Current Score: ${score}`);

        // Check if the cursor is unlocked
        if (!cursor.unlockAt || score >= cursor.unlockAt) {
            // If cursor is unlocked, show it in options
            const cursorOption = document.createElement("button");
            cursorOption.textContent = cursor.name;
            cursorOption.classList.add("cursor-option");

            // Check if it's the first time unlocking this cursor and show a message
            cursorOption.addEventListener("click", () => {
                changeCursor(cursor.url);
                unlockAward(`Congrats! You've unlocked the ${cursor.name} cursor!`);
            });

            cursorOptions.appendChild(cursorOption);
        }
    });

    console.log("Cursor options updated:", cursorOptions.innerHTML);
}

// Change cursor function
function changeCursor(cursorUrl) {
    console.log("Changing cursor to:", cursorUrl);  // Debugging output

    if (cursorUrl === "default") {
        document.body.style.cursor = "default";
    } else if (cursorUrl === "pointer") {
        document.body.style.cursor = "pointer";
    } else {
        document.body.style.cursor = `url('${cursorUrl}'), auto`;
    }

    // Apply to all clickable elements (optional)
    document.querySelectorAll("button, a").forEach(el => {
        el.style.cursor = `url('${cursorUrl}'), auto`;
    });

    selectedCursor = cursorUrl;
    localStorage.setItem("selectedCursor", selectedCursor);
    cursorPopup.style.display = "none";
}

// =====================
// Random Prize Handling
// =====================

const randomPrizeMessage = document.getElementById("random-prize-message");

const randomObjects = ["heart", "coin", "star", "gift"];
//Get a random prize
function getRandomPrize() {
    console.log("Getting random prize...");

    const prizeType = randomObjects[Math.floor(Math.random() * randomObjects.length)];

    if(prizeType === "heart"){
        return { type: "heart"};
    }
    // Example prize structure
    const prizeTypes = [
        { type: "increaseMultiplier", value: 1 },
        { type: "decreaseMultiplier", value: 1 },
        { type: "randomClicks", value: 10 }
    ];
    return prizeTypes[Math.floor(Math.random() * prizeTypes.length)];
}
// Function to create a random object and animate it
function createRandomObject() {
    console.log("Creating random object...");

    const randomObjectType = randomObjects[Math.floor(Math.random() * randomObjects.length)];
    console.log("Random object type:", randomObjectType);  // Log object type

    const randomObject = document.createElement("div");
    randomObject.style.width = "50px";
    randomObject.style.height = "50px";
    randomObject.style.position = "absolute";
    randomObject.style.zIndex = "9999";

    // Style based on object type
    switch (randomObjectType) {
        case "heart":
            randomObject.style.backgroundColor = "red";
            break;
        case "coin":
            randomObject.style.backgroundColor = "yellow";
            break;
        case "star":
            randomObject.style.backgroundColor = "blue";
            break;
        case "gift":
            randomObject.style.backgroundColor = "green";
            break;
        default:
            randomObject.style.backgroundColor = "gray";
            break;
    }

    randomObject.style.left = Math.random() * 80 + "vw";  // Limit horizontal range
    randomObject.style.top = Math.random() * 80 + "vh";   // Limit vertical range

    document.body.appendChild(randomObject);

    randomObject.addEventListener("click", () => {
        console.log("Random object clicked:", randomObjectType);
        const prize = getRandomPrize();
        applyPrize(prize);
        displayPrizeMessage(prize);
        randomObject.remove(); // Remove the object after being clicked
    });

    setTimeout(() => {
        randomObject.remove(); // Remove after 5 seconds if not clicked
    }, 5000);
}
// Apply the random prize to the player
function applyPrize(prize) {
  if (prize.type === "increaseMultiplier") {
    multiplier += prize.value;
    localStorage.setItem("multiplier", multiplier);
  } else if (prize.type === "decreaseMultiplier") {
    multiplier = Math.max(1, multiplier - prize.value); // Prevent multiplier from going below 1
    localStorage.setItem("multiplier", multiplier);
  } else if (prize.type === "randomClicks") {
    score += prize.value;
    localStorage.setItem("score", score);
  } else if (prize.type === "heart"){
    showHearts();
  }
}

// Display the prize message
function displayPrizeMessage(prize) {
  if (prize.type === "increaseMultiplier") {
    randomPrizeMessage.textContent = `Your multiplier has increased by ${prize.value}!`;
  } else if (prize.type === "decreaseMultiplier") {
    randomPrizeMessage.textContent = `Your multiplier has decreased by ${prize.value}!`;
  } else if (prize.type === "randomClicks") {
    randomPrizeMessage.textContent = `You received ${prize.value} random clicks!`;
  }
  
  // Show the message
  randomPrizeMessage.style.display = "block";
  setTimeout(() => {
    randomPrizeMessage.style.display = "none";
  }, 3000); // Hide message after 3 seconds
}

// Periodically create random objects
setInterval(createRandomObject, 5000); // Creates a random object every 5 seconds