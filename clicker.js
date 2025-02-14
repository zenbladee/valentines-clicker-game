// Load saved score and multiplier from localStorage
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let multiplier = localStorage.getItem("multiplier") ? parseInt(localStorage.getItem("multiplier")) : 1;

const scoreDisplay = document.getElementById("score");
const clickerButton = document.getElementById("clicker-button");

const resetButton = document.getElementById("reset-button");
const confirmResetButton = document.getElementById("confirm-reset-button");
const cancelResetButton = document.getElementById("cancel-reset-button");
const resetPopup = document.getElementById("reset-popup");

const awardPopup = document.getElementById("award-popup");
const awardMessage = document.getElementById("award-message");
const motivationalMessage = document.getElementById("motivational-message");
const heartContainer = document.createElement("div");
heartContainer.classList.add("heart-container");
document.body.appendChild(heartContainer);

const homeButton = document.getElementById("home-button");
if (homeButton) {
    homeButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

function handleResetButtonClick() {
    console.log("Reset Button Clicked");
    resetPopup.style.display = "block";
    resetPopup.classList.remove("reset-popup-hidden");  // Show the popup
}

// Function to handle the confirm reset button click
function handleConfirmResetButtonClick() {
    console.log("Confirm reset button clicked"); // Debugging line
    score = 0;
    multiplier = 1;
    localStorage.setItem("score", score);  // Save the reset score
    localStorage.setItem("multiplier", multiplier);  // Save the reset multiplier
    scoreDisplay.textContent = score;  // Update the displayed score
    resetPopup.classList.add("reset-popup-hidden");  // Hide the popup after confirmation
    resetPopup.style.display = "none";
}

// Function to handle the cancel reset button click
function handleCancelResetButtonClick() {
    console.log("Cancel reset button clicked"); // Debugging line
    resetPopup.classList.add("reset-popup-hidden");  // Hide the popup if canceled
    resetPopup.style.display = "none";
}

// Event Listeners for Button Clicks
resetButton.addEventListener("click", handleResetButtonClick);
confirmResetButton.addEventListener("click", handleConfirmResetButtonClick);
cancelResetButton.addEventListener("click", handleCancelResetButtonClick);

// Display saved score
scoreDisplay.textContent = score;

// Click event to update score
clickerButton.addEventListener("click", () => {
    score += multiplier;
    scoreDisplay.textContent = score;

    // Save score to localStorage
    localStorage.setItem("score", score);
    localStorage.setItem("multiplier", multiplier);

    checkMilestones();
    showMotivationalMessage();
});

// Check milestones for achievements
function checkMilestones() {
    if (score === 50) {
        unlockAward("You got this!");
    } else if (score === 100) {
        unlockAward("You're on fire! 🔥");
    } else if (score.toString().includes("143")) {
        unlockAward("I Love You ❤️");
        showHearts(); // Trigger falling hearts
    } else if (score >= 200 && multiplier === 1) {
        unlockAward("2x Multiplier Unlocked!");
        multiplier = 2;
        localStorage.setItem("multiplier", multiplier);
    }
}

// Unlocks awards with a popup
function unlockAward(message) {
    awardMessage.textContent = message;
    awardPopup.style.display = "block";

    setTimeout(() => {
        awardPopup.style.display = "none";
    }, 4500);
}

// Show motivational messages randomly
function showMotivationalMessage() {
    if (Math.random() < 0.03) {
        motivationalMessage.classList.remove("hidden");
        setTimeout(() => {
            motivationalMessage.classList.add("hidden");
        }, 1000);
    }
}

// Function to show falling hearts
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
