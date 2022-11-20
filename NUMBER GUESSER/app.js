/*
  GAME FUNCTION:
  PLAYER MUST GUESS A NUMBER BETWEEN A MIN AND MAX
  PLAYER GETS A CERTAIN AMOUNT OF GUESSES
  NOTIFY NUMBER OF GUESSES  TO PLAYERS 
  NOTIFY PLAYER THE CORRECT NUMBER IF LOSSES
  LET PLAYER CHOOSE TO PLAY AGAIN

*/

// GAME VALUES
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI ELEMENTS

const game = document.querySelector("#game");
minNum = document.querySelector(".min-num");
maxNum = document.querySelector(".max-num");
guessBtn = document.querySelector("#guess-btn");
guessInput = document.querySelector("#guess-input");
message = document.querySelector(".message");

// ASSIGN UI MIN AND MAX
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// LISTEN TO GUESS

guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //VALIDATE
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`please enter a number between ${min} and ${max}`, "red");
  }

  // CHECK IF WON
  if (guess === winningNum) {
    // game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // WRONG NUMBER
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // game over - lost

      gameOver(
        false,
        `Game over, YOU LOST. The correct number was ${winningNum}`
      );
    } else {
      // game continues - answers wrong

      guessInput.style.borderColor = "red";

      // Clear input
      guessInput.value = "";

      // Tell user its the wrong number
      setMessage(
        `${guess} is not corrrect, ${guessesLeft} guesses left`,
        "red"
      );
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // DISABLE INPUT
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  // set message
  setMessage(msg);

  // play again?
  guessBtn.value = "play again";
  guessBtn.className += "play-again";
}

// get winning num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// SET MESSAGE
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
