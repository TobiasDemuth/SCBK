const chessboard = document.getElementById('chessboard');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const bonusElement = document.getElementById('bonus');
const notificationElement = document.getElementById('notification');
const startButton = document.getElementById("start-button");

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.classList.add((row + col) % 2 === 0 ? 'even' : 'odd');
        square.dataset.row = row;
        square.dataset.col = col;
        chessboard.appendChild(square);
    }
}

let targetSquare;
let score = 0;
let timeRemaining = 3000;
let bonusPoints = 0;
let timer;
let gameActive = false;
let lastClickTime;

function resetGame() {
    
    clearInterval(timer);
    score = 0;
    bonusPoints = 0;
    timeRemaining = 3000;

    updateGameInfo();
    notificationElement.style.display = 'none';
}

function getRandomSquare() {
    const squares = document.querySelectorAll('.square');
    const randomIndex = Math.floor(Math.random() * squares.length);
    return squares[randomIndex];
}

function updateTargetSquare() {
    if (targetSquare) {
        notificationElement.style.display = 'none';
    }
    targetSquare = getRandomSquare();
    document.getElementById("target-notation").style.color = "rgb(0, 156, 196)";
    showTargetSquareNotification();
    lastClickTime = Date.now();
}

function showTargetSquareNotification() {
    notificationElement.textContent = notation;
    notificationElement.style.display = 'block';

    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, notificationDuration);
}

function updateGameInfo() {
    const formattedTime = (timeRemaining / 100).toFixed(0);
    
    scoreElement.textContent = score;
    timeElement.textContent = formattedTime;
}


function startTimer() {
    timer = setInterval(() => {
        timeRemaining -= 1;
        updateGameInfo();

        if (timeRemaining <1000) {
            const formattedTime = (timeRemaining / 100).toFixed(2);
            timeElement.textContent = formattedTime;

            document.getElementById("time").style.color = "red";
        }

        if (timeRemaining <= 0) {
            disableClicks();
            gameActive = false;
            document.getElementById("target-notation").removeAttribute("style");
            document.getElementById("time").removeAttribute("style");
            document.getElementById("notification").removeAttribute("style");

            updateGameInfo()
            clearInterval(timer);
            timeRemaining = 0;
            showNotification(`final score: ${score}`);
        }
    }, 10);
}

function showNotification(message) {
    notificationElement.textContent = message;
    notificationElement.style.display = 'block';
}

function startGame() {
    resetGame();
    updateTargetSquare();
    startTimer();
    gameActive = true;
    enableClicks();
}

function enableClicks() {
    if (gameActive) {
        chessboard.addEventListener('click', squareClick);
    }
}

function disableClicks() {
    chessboard.removeEventListener('click', squareClick);
}

function calculateBonusPoints() {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastClickTime;
    const maxBonusTime = 15000;
    const bonusPercentage = 100 - (timeDifference / maxBonusTime) * 100;

    return bonusPercentage > 0 ? Math.ceil(bonusPercentage) : 0;
}

function squareClick(event) {
    const clickedSquare = event.target;

    if (clickedSquare == targetSquare) {

        document.getElementById('notification').removeAttribute("style");
        document.getElementById('target-notation').removeAttribute("style");

        const timeBonus = calculateBonusPoints();
        bonusPoints = timeBonus;
        score += 10 + timeBonus;

        if (timeRemaining <= 50) {
            notificationDuration = timeRemaining-10;
        }
        else {
            updateTargetSquare();
            updateGameInfo();
        }

    }

    else {

        updateGameInfo();
        if (timeRemaining > 300) {
            timeRemaining -= 300;
        }

        else {
            timeRemaining -= timeRemaining-10;
        }
        
        document.getElementById('notification').style.color ="red";
        document.getElementById('target-notation').style.color ="red";

        const notificationDuration = 500;
        const notation = `wrong! ${String.fromCharCode(65 + parseInt(targetSquare.dataset.col))}${8 - parseInt(targetSquare.dataset.row)}`;

        document.getElementById('target-notation').textContent = notation;

        notificationElement.textContent = notation;
        notificationElement.style.display = 'block';

        setTimeout(() => {
            notificationElement.style.display = 'none';
            if (timeRemaining <= 0) {
                showNotification(`final score: ${score}`);
            }
        }, notificationDuration);
        
    }
}

function showTargetSquareNotification() {
    const notificationDuration = 500;
    const notation = `${String.fromCharCode(65 + parseInt(targetSquare.dataset.col))}${8 - parseInt(targetSquare.dataset.row)}`;

    document.getElementById('target-notation').textContent = notation;
    notificationElement.textContent = notation;
    notificationElement.style.display = 'block';

    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, notificationDuration);
}

function startCountdown() {
    document.getElementById("target-notation").removeAttribute("style");
    document.getElementById("time").removeAttribute("style");
    document.getElementById("notification").removeAttribute("style");

    startButton.disabled = true;
    
    let count = 350;
    const notificationElement = document.getElementById('notification');

    const countdownInterval = setInterval(() => {
        notificationElement.textContent = (count/100).toFixed(0);
        notificationElement.style.display = 'block';
        count--;

        if (count <50) {
            notificationElement.textContent = "GO!";
            document.getElementById("notification").style.color = "red";
        }

        if (count < 0) {
            document.getElementById("notification").removeAttribute('style');
            clearInterval(countdownInterval);
            notificationElement.style.display = 'none';
            startGame();
            startButton.disabled = false;
        }
    }, 10);
}