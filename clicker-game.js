let score = 0;

document.getElementById("clicker-button").addEventListener("click", function() {
    score++;
    document.getElementById("score").innerText = score;
});