var mainImgUI = document.getElementById("main-img");
// var startGameBtnUI = document.getElementById("start-game-btn");
var mainWordUI = document.getElementById("main-word");
var lettersUsedUI = document.getElementById("used-so-far");
var totalWinsUI = document.getElementById("total-wins");
var triesLeftUI = document.getElementById("tries-left");
var navNewGame = document.getElementById("nav-new-game");

var totalTries = 6;
var totalWins = 0;
var usedSoFar = [];
var currentWord = [];
var currentWordHidden = [];
var gamesPlayed = 0;

document.onkeypress = function(event) {
    if(gamesPlayed === 0) {
        startGame();
    } else {
        var code = event.keyCode;               
        var codeChar = String.fromCharCode(code); 

        var regex1 = RegExp('^[a-zA-Z]+$');
        if(regex1.test(codeChar) !== true) {
            return;
        }
        
        var newLetter = 0;
        if(usedSoFar.indexOf(codeChar.toUpperCase()) == -1) {
            usedSoFar.push(codeChar.toUpperCase());
            newLetter = 1;
        };
  
        lettersUsedUI.innerHTML = usedSoFar.join(" ");
        triesLeftUI.innerHTML = totalTries;

        var maskedWord = getMaskedWord(currentWord, usedSoFar);
        mainWordUI.innerHTML = maskedWord;

        totalWinsUI.innerHTML = totalWins;

        if(newLetter == 1) {
            if(currentWord.indexOf(codeChar.toUpperCase()) == -1) {
                totalTries--;
                letterMisMatchAction(codeChar.toUpperCase());
            } else {
                totalWins++;
                letterMatchAction();
            };
        }
    };
};

window.onload = function() {
    mainImgUI.src = "assets/images/hangman-0.jpg";
};

navNewGame.addEventListener("click", function() {
    reStartGame();
});

function reStartGame() {
    var restart = confirm("Are you sure you want to restart the game?");
    if(restart == true) { 
        startGame(1);
    }
};

function startGame(restart) {
    var msg = "The game is about to start.";
    if(restart === 1) { msg = "The game is about to restart."; }
    alert(msg);

    gamesPlayed++;
    reInitialize();
    // startGameBtnUI.style.display = "none";
    //ScoreUI('show');

    var words = getWords();
    var word = words[Math.floor(Math.random()*words.length)].toUpperCase();
    currentWord = word.split("");
    var maskedWord = getMaskedWord(currentWord, usedSoFar);
    mainWordUI.innerHTML = maskedWord;

    lettersUsedUI.innerHTML = usedSoFar.join(" ");
    triesLeftUI.innerHTML = totalTries;
    totalWinsUI.innerHTML = totalWins;

    setBackDrop();
};

function getMaskedWord (currentWord, currentGuessed) {
    var maskedWord = "";
    for (var i = currentWord.length - 1; i >= 0; i--) {
        var mask = 1;
        for (var x = 0; x < currentGuessed.length; x++) {
            if(currentGuessed[x].toUpperCase() == currentWord[i].toUpperCase()) {
                mask = 0;
                break;
            }
        };
        if(mask == 1) {
            maskedWord = "_ " + maskedWord;    
        } else {
            maskedWord = currentWord[i] + " " + maskedWord;
        };
    };
    return maskedWord;
};

function letterMatchAction() {
    console.log("Letter Match");
    if(totalWins == currentWord.length) {
        alert("You have won!");
        startGame(1)
    };
};

function letterMisMatchAction(letter) {
    console.log("Letter MisMatch");
    if(totalTries < 1) {
        alert("You have lost. Try again.");
        startGame(1);
    } else {
        alert("Letter " + letter + " is not part of the mistery word.\nYou have " + totalTries + " tries left.");
    }
    setBackDrop();
};

function setBackDrop() {
    if(totalTries == 6) {
        mainImgUI.src = "assets/images/hangman-0.jpg";
    } else if(totalTries == 5) {
        mainImgUI.src = "assets/images/hangman-1.jpg";
    } else if(totalTries == 4) {
        mainImgUI.src = "assets/images/hangman-2.jpg";
    } else if(totalTries == 3) {
        mainImgUI.src = "assets/images/hangman-3.jpg";
    } else if(totalTries == 2) {
        mainImgUI.src = "assets/images/hangman-4.jpg";
    } else if(totalTries == 1) {
        mainImgUI.src = "assets/images/hangman-5.jpg";
    } else {
        mainImgUI.src = "assets/images/hangman-6.jpg";
    }
};

function reInitialize() {
    totalTries = 6;
    totalWins = 0;
    usedSoFar = [];
    currentWord = [];
    currentWordHidden = [];

    mainWordUI.innerHTML = "";
    lettersUsedUI.innerHTML = "";
    totalWinsUI.innerHTML = "";
    triesLeftUI.innerHTML = "";
};

function getWords() {
    var words = [
        "float",
        "appliance",
        "youthful",
        "agonizing",
        "smell",
        "dependent",
        "befitting",
        "price",
        "car",
        "soggy",
        "abounding",
        "white",      
    ];

    return words;
};