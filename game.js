const MOVES = ["rock", "paper", "scissors"];
const BEATS = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};

const labels = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors",
};

const score = {
  player: 0,
  computer: 0,
  draws: 0,
};

let playing = true;

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const drawScoreEl = document.getElementById("draw-score");
const resultEl = document.getElementById("result");
const playArea = document.getElementById("play-area");
const exitScreen = document.getElementById("exit-screen");
const finalScoreEl = document.getElementById("final-score");
const exitBtn = document.getElementById("exit-btn");

function randomComputerMove() {
  return MOVES[Math.floor(Math.random() * MOVES.length)];
}

function decideWinner(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return "draw";
  }
  if (BEATS[playerMove] === computerMove) {
    return "player";
  }
  return "computer";
}

function playRound(playerMove) {
  if (!playing) {
    return;
  }

  const computerMove = randomComputerMove();
  const winner = decideWinner(playerMove, computerMove);

  if (winner === "draw") {
    score.draws += 1;
    resultEl.textContent =
      `You chose ${labels[playerMove]}. Computer chose ${labels[computerMove]}. Draw.`;
  } else if (winner === "player") {
    score.player += 1;
    resultEl.textContent =
      `You chose ${labels[playerMove]}. Computer chose ${labels[computerMove]}. You win.`;
  } else {
    score.computer += 1;
    resultEl.textContent =
      `You chose ${labels[playerMove]}. Computer chose ${labels[computerMove]}. Computer wins.`;
  }

  playerScoreEl.textContent = String(score.player);
  computerScoreEl.textContent = String(score.computer);
  drawScoreEl.textContent = String(score.draws);
}

function exitGame() {
  if (!playing) {
    return;
  }

  const confirmed = window.confirm("Leave the game now?");
  if (!confirmed) {
    return;
  }

  playing = false;
  playArea.classList.add("hidden");
  exitBtn.classList.add("hidden");
  finalScoreEl.textContent =
    `Final score — You ${score.player}, Computer ${score.computer}, Draws ${score.draws}.`;
  exitScreen.classList.remove("hidden");
}

document.querySelectorAll(".move-btn").forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.dataset.move);
  });
});

exitBtn.addEventListener("click", exitGame);
