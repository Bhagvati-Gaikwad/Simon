const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let started = false;

document.getElementById("start-btn").addEventListener("click", startGame);

document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", function () {
        if (!started) return;
        let clickedColor = this.id;
        playerSequence.push(clickedColor);
        animatePress(clickedColor);
        checkAnswer(playerSequence.length - 1);
    });
});

function startGame() {
    if (!started) {
        level = 0;
        gameSequence = [];
        started = true;
        nextSequence();
    }
}

function nextSequence() {
    playerSequence = [];
    level++;
    document.getElementById("message").innerText = `Level ${level}`;
    let randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
    flashButton(randomColor);
}

function checkAnswer(currentLevel) {
    if (playerSequence[currentLevel] === gameSequence[currentLevel]) {
        if (playerSequence.length === gameSequence.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function flashButton(color) {
    let button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 500);
}

function animatePress(color) {
    let button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 300);
}

function gameOver() {
    document.getElementById("message").innerText = "Game Over! Press Start to Play Again";
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);
    started = false;
}
