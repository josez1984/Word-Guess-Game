var mainImg = document.getElementById("main-img");
var startGameBtn = document.getElementById("start-game-btn");
var mainWord = document.getElementById("main-word");
var lettersUsed = document.getElementById("used-so-far");
var totalWins = document.getElementById("total-wins");
var triesLeft = document.getElementById("tries-left");

document.onkeypress = function() {
    alert("KEY PRESSED!!");
    ScoreUI();
};

window.onload = function() {
    alert("PAGE LOADED ???");
    mainImg.src = "assets/images/354.jpg";
};

startGameBtn.addEventListener("click", function(){
    startGame();
});

function startGame() {
    startGameBtn.style.display = "none";
    ScoreUI('show');

    
};

function ScoreUI(action) {
    if(action === 'show') {
        mainWord.style.display = 'block';
        lettersUsed.style.display = 'block';
        totalWins.style.display = 'block';
        triesLeft.style.display = 'block';
    } else {
        mainWord.style.display = 'none';
        lettersUsed.style.display = 'none';
        totalWins.style.display = 'none';
        triesLeft.style.display = 'none';    
    }
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