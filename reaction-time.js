let startTime, endTime, bestTime = localStorage.getItem("bestTime") || null;
let reactionButton = document.getElementById("reaction-button");
let readyButton = document.getElementById("ready-button");
let timerDisplay = document.getElementById("timer-display");
let bestTimeDisplay = document.getElementById("best-time");

// Display the best recorded time
if (bestTime) {
    bestTimeDisplay.textContent = bestTime + "ms";
}

readyButton.addEventListener("click", () => {
    readyButton.disabled = true;
    reactionButton.disabled = true;
    reactionButton.textContent = "Wait for Green...";
    reactionButton.classList.remove("active");

    let randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 second wait

    setTimeout(() => {
        startTime = new Date().getTime();
        reactionButton.textContent = "CLICK!";
        reactionButton.disabled = false;
        reactionButton.classList.add("active");
    }, randomDelay);
});

reactionButton.addEventListener("click", () => {
    if (!startTime) return;

    endTime = new Date().getTime();
    let reactionTime = endTime - startTime;

    let minutes = Math.floor(reactionTime / 60000);
    let seconds = Math.floor((reactionTime % 60000) / 1000);
    let milliseconds = reactionTime % 1000;

    timerDisplay.textContent = `${minutes}m ${seconds}s ${milliseconds}ms`;

    if (!bestTime || reactionTime < bestTime) {
        bestTime = reactionTime;
        localStorage.setItem("bestTime", bestTime);
        bestTimeDisplay.textContent = bestTime + "ms";
    }

    reactionButton.textContent = "Try Again";
    readyButton.disabled = false;
    startTime = null;
});

// Home button functionality
document.getElementById("home-button").addEventListener("click", () => {
    window.location.href = "index.html";
});
