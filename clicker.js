let score = 0;
let multiplier = 1;

const scoreDisplay = document.getElementById("score");
const clickerButton = document.getElementById("clicker-button");
const upgradesDiv = document.getElementById("upgrades");

// Function to handle clicking
clickerButton.addEventListener("click", function () {
    score += multiplier;
    scoreDisplay.innerText = score;
    checkUpgrades();
});

// Function to check for unlockable upgrades
function checkUpgrades() {
    if (score === 50) {
        unlockReward("🎉 You reached 50 clicks! Keep going!");
    }
    if (score === 100) {
        unlockReward("🔥 100 Clicks! You're on fire!");
    }
    if (score === 200 && multiplier === 1) {
        unlockReward("⚡ 2x Multiplier Unlocked!");
        multiplier = 2;
    }
}

// Function to display rewards
function unlockReward(message) {
    const rewardMessage = document.createElement("p");
    rewardMessage.innerText = message;
    upgradesDiv.appendChild(rewardMessage);
}