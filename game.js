var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;

function nextSequence () {
    var randNum = Math.floor(Math.random() * 4);
    var randColor = buttonColors[randNum];
    gamePattern.push(randColor);
    playSound(randColor);
    animatePress(randColor);
    $("h1").text("Level " + ++level);
    userPattern = [];
}

function playSound (name) {
    var audio = new Audio ("./sounds/" + name + ".mp3");
    audio.play();
    return;
}

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        document.getElementById(currentColor).classList.remove("pressed");
    }, 100);
    return;
}

$(".btn").on("click", function() {
    var userColor = $(this).attr("id");
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userpattern.length - 1);
});

$(document).keypress(function() {
    if (level === 0){
        nextSequence();
    }
});

function checkAnswer (idx) {
    if(userPattern[idx] != gamePattern[idx]){
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("h1").text("Game Over, Press Any Key to restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        resetGame ();
        return;
    }
    if (idx+1 === level){
        setTimeout(nextSequence, 500);
    }
}

function resetGame () {
    gamePattern = [];
    userPattern = [];
    level = 0;

}
