const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner() {
  let roundWon = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "😐 Draw!";
    gameActive = false;
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer} turn`;
    }
  });
});

resetBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
});
