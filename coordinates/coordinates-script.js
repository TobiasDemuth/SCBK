const chessboard = document.getElementById('chessboard');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const bonusElement = document.getElementById('bonus');
const notificationElement = document.getElementById('notification');

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
let timeRemaining = 30;
let bonusPoints = 0;
let timer;
let gameActive = false;
let lastClickTime;

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
    showTargetSquareNotification();
    lastClickTime = Date.now();
}

function showTargetSquareNotification() {
    const notificationDuration = 750;
    const notation = `${String.fromCharCode(65 + parseInt(targetSquare.dataset.col))}${8 - parseInt(targetSquare.dataset.row)}`;

    notificationElement.textContent = notation;
    notificationElement.style.display = 'block';

    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, notificationDuration);
}

function updateGameInfo() {
    scoreElement.textContent = score;
    timeElement.textContent = timeRemaining;
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining -= 1;
        updateGameInfo();

        if (timeRemaining === 0) {
            clearInterval(timer);
            showNotification(`final score: ${score}`);
            gameActive = false;
            disableClicks();
        }
    }, 1000);
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

function resetGame() {
    clearInterval(timer);
    score = 0;
    bonusPoints = 0;
    timeRemaining = 30;
    updateGameInfo();
    notificationElement.style.display = 'none';
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
    const maxBonusTime = 30000;
    const bonusPercentage = 100 - (timeDifference / maxBonusTime) * 100;

    return bonusPercentage > 0 ? Math.ceil(bonusPercentage) : 0;
}

function squareClick(event) {
    const clickedSquare = event.target;

    if (clickedSquare === targetSquare) {
        const timeBonus = calculateBonusPoints();
        bonusPoints = timeBonus;
        score += 1 + timeBonus;
        updateTargetSquare();
        updateGameInfo();
    }
}

function showTargetSquareNotification() {
    const notificationDuration = 750;
    const notation = `${String.fromCharCode(65 + parseInt(targetSquare.dataset.col))}${8 - parseInt(targetSquare.dataset.row)}`;

    document.getElementById('target-notation').textContent = notation;

    notificationElement.textContent = notation;
    notificationElement.style.display = 'block';

    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, notificationDuration);
}

}

function startCountdown() {
    let count = 3;
    const notificationElement = document.getElementById('notification');

    const countdownInterval = setInterval(() => {
        notificationElement.textContent = `Starting in ${count} seconds...`;
        notificationElement.style.display = 'block';
        count--;

        if (count < 0) {
            clearInterval(countdownInterval);
            notificationElement.style.display = 'none';
            startGame();
        }
    }, 1000);
}
