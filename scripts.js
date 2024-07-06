const gameContainer = document.querySelector(".game-container");
const restartButton = document.getElementById("restart-btn");

let flipped = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = 3;

const cards = [
  {
    tech: "html",
    img: "assets/html.png",
  },
  {
    tech: "html",
    img: "assets/html.png",
  },
  {
    tech: "css",
    img: "assets/css.png",
  },
  {
    tech: "css",
    img: "assets/css.png",
  },
  {
    tech: "js",
    img: "assets/js.png",
  },
  {
    tech: "js",
    img: "assets/js.png",
  },
];

function shuffle(array) {
  let currentIndex = array.length,
    temp,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

function startGame() {
  gameContainer.innerHTML = "";

  shuffle(cards);

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("memory-card");
    cardElement.dataset.tech = card.tech;

    const back = document.createElement("img");
    back.classList.add("back");
    back.src = card.img;
    back.alt = card.tech;

    const front = document.createElement("img");
    front.classList.add("front");
    front.src = "https://placehold.co/130x130/fff/ccc/";
    front.alt = "Back";

    cardElement.appendChild(back);
    cardElement.appendChild(front);

    cardElement.addEventListener("click", flipCard);

    gameContainer.appendChild(cardElement);
  });

  resetBoard();
  matchedPairs = 0;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!flipped) {
    flipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.tech === secondCard.dataset.tech;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  matchedPairs++;
  if (matchedPairs === totalPairs) {
    showToastMessage("Congratulations! You've won the game!");
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [flipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
  resetBoard();
  startGame();
}

function showToastMessage(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.classList.add("toast");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

restartButton.addEventListener("click", resetGame);

startGame();
