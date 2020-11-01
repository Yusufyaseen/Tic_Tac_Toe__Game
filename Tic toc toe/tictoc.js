let firstUser;
let secondUser;
let x_class = "x";
let circle_class = "circle";
const winning_combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;
const cellElements = document.querySelectorAll("[data-cell]");
const restart = document.getElementById("restartButton");
const starting = document.getElementById("starting");
const startElement = document.querySelector("#startMessage");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const board = document.getElementById("board");
// const winningMessageElement = document.getElementById("winningMessage");
const winningMessageElement = document.querySelector("#winningMessage");
starting.addEventListener("click", start);
function start() {
  firstUser = prompt("Enter first user");
  secondUser = prompt("Enter second user");
  startElement.classList.remove("show");
  startElement.classList.add("start");
}
startGame();
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true }); // {once: true} It enforce(make the event work only) the event to be clicked once(one time only)
  });
  setBoardHoverClass();
}
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle_class : x_class;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapClass();
    setBoardHoverClass();
  }
}
restart.addEventListener("click", refresh);
function refresh() {
  location.reload();
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    );
  });
}
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = `Draw!`;
  } else {
    winningMessageText.innerText = `${
      circleTurn
        ? `${secondUser ? secondUser : "O’s"}`
        : `${firstUser ? firstUser : "X’s"}`
    } Won!`;
  }
  winningMessageElement.classList.add("show");
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapClass() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(circle_class);
  if (circleTurn) board.classList.add(circle_class);
  else board.classList.add(x_class);
}
function checkWin(currentClass) {
  return winning_combination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
