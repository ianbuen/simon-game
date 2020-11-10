
// array to store the extending sequence of the game
var gamePattern = [];
var userClickedPattern = [];

// define the colors for the game
var buttonColours = ["red", "blue", "green", "yellow"];

// other game variables
var randomChosenColour;
var gameStarted = false;

// audio element to be used in the entire game
// var audio = new Audio();

// set h1 title to initial value
$("h1").text("Press Any Key to Start");

// add a keyboard function to webpage
// starts game with any key. works once until game over
$(document).on("keypress", function(event) {
    if (!gameStarted) {

      gameStarted = true;

      // add the first color
      addNewColor();

    } else {

      // block key input once game started
      event.preventDefault();

    }
});



// add click function to all buttons
$(".btn").click(function (event) {

  if (gameStarted) {

    // get the color ID of the button clicked by user
    var userChosenColour = $(this).attr('id');

    // add it to the userClickedPattern
    userClickedPattern.push(userChosenColour);

    // animate the clicked button
    animatePress(userChosenColour);

    // play the sound for that color as well
    playSound(userChosenColour);

    // check the clicked color if it follows the gamePattern
    checkAnswer(userClickedPattern.length - 1);

  }

  else {

    // prevent clicks if game not yet started
    event.preventDefault();

  }


});




//----  FUNCTIONS BELOW THIS LINE (Alphabetical)  -----


// enters a new color to the gamePattern
function addNewColor() {

  // game selects a random color
  randomChosenColour = buttonColours[nextSequence()];

  // add the next random color to the game pattern
  gamePattern.push(randomChosenColour);
  // log("Game: " + gamePattern);

  // increase the current level based on the length of gamePattern
  $("h1").text("Level " + gamePattern.length);

  // select the button of the chosen color and make it flash once
  // and play its sound file
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  // clear this array, as it's time for user's turn
  userClickedPattern = [];
}

// adds a shadow and flashing animation to the button clicked
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// shortcut to console log
function log(object) {
  console.log(object);
}

// Checks the user's click if it matches the sequence
function checkAnswer(lastAnswer) {
  // log("Game: " + gamePattern + "\n" + "User: " + userClickedPattern);

  if (userClickedPattern[lastAnswer] === gamePattern[lastAnswer]) {

      if (userClickedPattern.length === gamePattern.length)
          setTimeout(addNewColor, 1000);
  }

  else {

      gameOver();
  }
}

// End game, revert to initial state.
function gameOver() {

    // animate background color
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // end animate

    playSound("wrong");

    // reset game state
    gamePattern = [];
    $("h1").text("Game Over! Press Any Key to Restart")
    gameStarted = false;
}


// generate a random whole number from 0 to 3
// also increase level by 1
function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);

  return randomNumber;
}


// plays sound of a selected file
function playSound(file) {
  (new Audio("sounds/" + file + ".mp3")).play();
}
