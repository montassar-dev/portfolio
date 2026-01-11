const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const scoreSpan = document.getElementById("score");
const resetBtn = document.getElementById("reset");

let playerX = 180;
let obstacles = [];
let score = 0;
let gameInterval;

// إنشاء العوائق
function createObstacle() {
  const obs = document.createElement("div");
  obs.classList.add("obstacle");

  const x = Math.floor(Math.random() * 9) * 40; // 0-360px
  obs.style.left = x + "px";
  obs.style.top = "-100px";

  gameArea.appendChild(obs);
  obstacles.push(obs);
}

// تحريك العوائق
function moveObstacles() {
  obstacles.forEach((obs, index) => {
    let top = parseInt(obs.style.top);
    top += 5;
    obs.style.top = top + "px";

    // إزالة العوائق عند الخروج
    if (top > 500) {
      obs.remove();
      obstacles.splice(index, 1);
      score++;
      scoreSpan.textContent = score;
    }

    // الاصطدام باللاعب
    const playerRect = player.getBoundingClientRect();
    const obsRect = obs.getBoundingClientRect();
    if (
      playerRect.left < obsRect.right &&
      playerRect.right > obsRect.left &&
      playerRect.top < obsRect.bottom &&
      playerRect.bottom > obsRect.top
    ) {
      gameOver();
    }
  });
}

function gameOver() {
  clearInterval(gameInterval);
  alert("💀 Game Over! Score: " + score);
}

// التحكم باللاعب
function movePlayer(e) {
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 40;
  }
  if (e.key === "ArrowRight" && playerX < 360) {
    playerX += 40;
  }
  player.style.left = playerX + "px";
}

// بدء اللعبة
function startGame() {
  // إعادة ضبط
  playerX = 180;
  player.style.left = playerX + "px";
  obstacles.forEach(obs => obs.remove());
  obstacles = [];
  score = 0;
  scoreSpan.textContent = score;

  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    if (Math.random() < 0.02) createObstacle();
    moveObstacles();
  }, 20);
}

document.addEventListener("keydown", movePlayer);
resetBtn.addEventListener("click", startGame);

startGame();
