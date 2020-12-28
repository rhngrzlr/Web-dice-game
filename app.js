//Төлөвийн хувьсагч
var isNewGame;
//Тоглогчийн ээлжийг хадгалах хувьсагч
var activePlayer;
//Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
var score;
//Тоглогчийн ээлжийн оноог хадгалах хувьсагч
var roundScore;

var diceDom = document.querySelector(".dice");

RestartGame();

function RestartGame() {
  isNewGame = true;
  activePlayer = 0;
  score = [0, 0];
  roundScore = 0;

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isNewGame === true) {
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    diceDom.style.display = "block";
    diceDom.src = "dice-" + diceNumber + ".png";

    if (diceNumber !== 1) {
      roundScore = roundScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      switchToNextPlayer();
    }
  }
});

//Hold button event
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isNewGame === true) {
    score[activePlayer] += roundScore;

    //Niit avsan onoog n haruulah
    document.getElementById("score-" + activePlayer).textContent =
      score[activePlayer];

    //100-s ih onootoi bolson eseh
    if (score[activePlayer] >= 100) {
      isNewGame = false;
      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else switchToNextPlayer();
  }
});

function switchToNextPlayer() {
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  diceDom.style.display = "none";
}

//Newgame buttonii event listener
document.querySelector(".btn-new").addEventListener("click", RestartGame);
