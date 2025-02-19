const board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

let currentPlayer = "X";
let p1 = 0;
let p2 = 0;
let gameOver = false;
let playerNames = { X: "Player X", O: "Player O" };
function displayBoard() {
  const cells = document.querySelectorAll(".cell");
  let index = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cells[index].textContent = board[i][j];
      cells[index].style.pointerEvents = gameOver ? "none" : "auto";
      index++;
    }
  }
}
function makeMove(row, col) {
  if (board[row][col] !== " " || gameOver) return;
  board[row][col] = currentPlayer;
  displayBoard();
  if (checkWin(currentPlayer)) {
    gameOver = true;
    if (currentPlayer === "X") {
      p1++;
    } else {
      p2++;
    }
    updateScores();
    endGame(`${playerNames[currentPlayer]} Wins!`);
    return;
  }
  if (checkDraw()) {
    gameOver = true;
    draw++;
    updateScores();
    endGame("It's a Draw!");
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
function checkWin(player) {
  let winPatterns = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];
  for (let pattern of winPatterns) {
    if (
      board[pattern[0][0]][pattern[0][1]] === player &&
      board[pattern[1][0]][pattern[1][1]] === player &&
      board[pattern[2][0]][pattern[2][1]] === player
    ) {
      return true;
    }
  }
  return false;
}
function checkDraw() {
  return board.flat().every((cell) => cell !== " ");
}
function updateScores() {
  document.getElementById("playerXscore").textContent = `Score: ${p1}`;
  document.getElementById("playerOScore").textContent = `Score: ${p2}`;
}

function NameXHandel() {
  let input = document.getElementById("myInput");
  let button = document.getElementById("submit1");
  let nameDisplay = document.getElementById("playerXName");

  if (input.value.trim() !== "") {
    playerNames.X = input.value;
    nameDisplay.textContent = input.value;
    nameDisplay.style.fontSize = "24px";
    nameDisplay.style.fontWeight = "bold";
    nameDisplay.style.color = "white";
  }
  input.style.display = "none";
  button.style.display = "none";
}
function NameOHandel() {
  let input = document.getElementById("secInput");
  let button = document.getElementById("submit2");
  let nameDisplay = document.getElementById("playerOName");

  if (input.value.trim() !== "") {
    playerNames.O = input.value;
    nameDisplay.textContent = input.value;
    nameDisplay.style.fontSize = "24px";
    nameDisplay.style.fontWeight = "bold";
    nameDisplay.style.color = "white";
  }
  input.style.display = "none";
  button.style.display = "none";
}
function endGame(message) {
  let div = document.createElement("div");
  div.className = "popup";

  let divText = document.createElement("p");
  divText.textContent = message;
  div.appendChild(divText);
  let buttons = document.createElement("div");
  buttons.className = "buttons";
  let playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Play Again";
  playAgainBtn.className = "play_again";
  playAgainBtn.addEventListener("click", resetGame);
  buttons.appendChild(playAgainBtn);

  let newGameBtn = document.createElement("button");
  newGameBtn.textContent = "New Game";
  newGameBtn.className = "new_game";
  newGameBtn.addEventListener("click", () => location.reload());
  buttons.appendChild(newGameBtn);
  div.appendChild(buttons);
  document.body.appendChild(div);
}

function resetGame() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = " ";
    }
  }

  gameOver = false;
  document.querySelector(".popup").remove();
  displayBoard();
}
