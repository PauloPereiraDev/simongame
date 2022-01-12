var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function() {
  if (started) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(buttonColours.indexOf(userChosenColour));
  }
});

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
  level += 1;
  $("#level-title").html("Level " + level);
}

function playsound(name) {
  var som = new Audio('sounds/' + name + '.mp3');
  som.play();
}

function animatePress(currentcolour) {
  $("#" + currentcolour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentcolour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var ind = userClickedPattern.length - 1;
  if (buttonColours[currentLevel] == gamePattern[ind]) {
    console.log("right");
  } else {
    console.log("wrong");
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    $("#level-title").html("Game Over, Press Any Key to Restart");
  }
  if (ind + 1 == gamePattern.length) {
    userClickedPattern = [];
    setTimeout(nextSequence(), 1000);
    console.log("go");
  }
}
