let userScore = 0;
let compScore = 0;
let timer;
let timeLeft = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const newbtn = document.querySelector("#new");
const userScorepara = document.querySelector("#yourscore");
const compScorepara = document.querySelector("#compscore");
const timerDisplay = document.querySelector("#timer");


const playSound = (soundId) => {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play();
};


const showConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
};


const startTimer = () => {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            msg.innerText = "Time's up! Play again.";
            msg.style.backgroundColor = "#081b31";
            resetTimer();
        }
    }, 1000);
};

const resetTimer = () => {
    clearInterval(timer);
    timeLeft = 5;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
};


const stopTimer = () => {
    clearInterval(timer);
};

const newGame = () => {
    userScore = 0;
    compScore = 0;
    userScorepara.innerText = "0";
    compScorepara.innerText = "0";
    msg.innerText = "Play your game";
    msg.style.backgroundColor = "#081b31";
    resetTimer();
    enableChoices();
};

const genCompChoice = () => {
    let options = ["paper", "scissor", "rock"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const gameDraw = () => {
    msg.innerText = "Game Draw, Play Again";
    msg.style.backgroundColor = "#081b31";
    playSound("draw-sound");
};


const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorepara.innerText = userScore;
        msg.innerText = `You win!! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        playSound("win-sound");

        
        if (userScore === 10) {
            showConfetti();
            msg.innerText = `You win the match! 🎉`;
            disableChoices();
            stopTimer(); 
        }
    } else {
        compScore++;
        compScorepara.innerText = compScore;
        msg.innerText = `You lose!! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        playSound("click-sound");

        
        if (compScore === 10) {
            msg.innerText = `Computer wins the match! 😢`;
            disableChoices();
            stopTimer(); 
        }
    }

    
    if (userScore === 10 || compScore === 10) {
        disableChoices();
        stopTimer(); 
    }
};

const disableChoices = () => {
    choices.forEach((choice) => {
        choice.style.pointerEvents = "none";
    });
};

const enableChoices = () => {
    choices.forEach((choice) => {
        choice.style.pointerEvents = "auto";
    });
};

const playGame = (userChoice) => {
    if (userScore < 10 && compScore < 10) {
        const compChoice = genCompChoice();
        if (userChoice === compChoice) {
            gameDraw();
        } else {
            let userWin = true;
            if (userChoice === "rock") {
                userWin = compChoice === "paper" ? false : true;
            } else if (userChoice === "paper") {
                userWin = compChoice === "scissor" ? false : true;
            } else {
                userWin = compChoice === "rock" ? false : true;
            }
            showWinner(userWin, userChoice, compChoice);
        }
        resetTimer();
        startTimer(); 
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
        playSound("click-sound");
    });
});

newbtn.addEventListener("click", () => {
    newGame();
});
