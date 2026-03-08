// Select score and timer display elements
const scoreDisplay = document.querySelector('#score-display');
let score = 0;
scoreDisplay.innerText = score;

const timerDisplay = document.querySelector('#timer-display');
let timeLeft = 30;
timerDisplay.innerText = timeLeft;

const cells = document.querySelectorAll('.cell');

let bugSpeed = 800;

// Add click sound effect
const clickSound = new Audio('bug.m4a'); // Replace with actual sound file

function randomBug() {
  removeBug();

  if (score === 20) {
    bugSpeed = bugSpeed / 2;
  }

  const randomNumber = Math.floor(Math.random() * cells.length);
  const cell = cells[randomNumber];
  cell.classList.add('bug');
}

const bugMovement = setInterval(randomBug, bugSpeed);

function removeBug() {
  for (let i = 0; i < cells.length; i++) {
    const cellToClean = cells[i];
    cellToClean.classList.remove('bug');
  }
}

// Add event listener for clicking the bug
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.addEventListener('click', function () {
    if (cell.classList.contains('bug')) {
      clickSound.currentTime = 0; // Reset sound to avoid delay
      clickSound.play(); // Play the click sound

      score++;
      scoreDisplay.innerText = score;

      cell.classList.remove('bug');
      cell.classList.add('splat');

      setTimeout(function () {
        cell.classList.remove('splat');
      }, 200);
    }
  });
}

const timer = setInterval(countDown, 1000);

function countDown() {
  timeLeft--;
  timerDisplay.innerText = timeLeft;

  if (timeLeft === 0) {
    clearInterval(timer);
    clearInterval(bugMovement);
    removeBug();

    showAlert(`GAME OVER! Points: ${score}`);
  }
}
