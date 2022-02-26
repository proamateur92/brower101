'use strict';

const ITEM_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

let started = false;
let leftTime = 5;
let timeOver = undefined;
let leftCarrot = 0;

const playButton = document.querySelector('.game__play');
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameTimer = document.querySelector('.game__timer');
const carrotCounter = document.querySelector('.game__counter');
const popUp = document.querySelector('.pop-up');
const replayButton = document.querySelector('.pop-up__replay');
const popUpMessage = document.querySelector('.pop-up__message');
const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');

function initGame() {
  field.innerHTML = '';
  carrotCounter.innerText = CARROT_COUNT;
  calcTime(leftTime);
  addItem('bug', BUG_COUNT, 'img/bug.png');
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
}

function startGame() {
  leftTime = 5;
  leftCarrot = 0;

  initGame();
  showStopButton();
  showTimerWithCounter();
  startTimer();
  bgSound.currentTime = 0;
  soundPlay(bgSound);
  started = true;
}

function stopGame() {
  stopTimer();
  hidePlayButton();
  popUpShow('RETRY?');
  soundPlay(bugSound);
  soundPause(bgSound);
  started = false;
}

function finishGame(message) {
  popUpShow(message);
  hidePlayButton();
  stopTimer();
  soundPause(bgSound);
  started = false;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - ITEM_SIZE;
  const y2 = fieldRect.height - ITEM_SIZE;

  for (let i = 0; i < count; i++) {
    const items = document.createElement('img');
    items.setAttribute('class', className);
    items.setAttribute('src', imgPath);
    items.style.position = 'absolute';
    let x = fixedLocation(x1, x2);
    let y = fixedLocation(y1, y2);

    items.style.left = `${x}px`;
    items.style.top = `${y}px`;
    field.append(items);
  }
}

function fixedLocation(min, max) {
  return Math.floor(Math.random() * (max - min));
}

function showStopButton() {
  const icon = document.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerWithCounter() {
  gameTimer.style.visibility = 'visible';
  carrotCounter.style.visibility = 'visible';
}

function startTimer() {
  timeOver = setInterval(() => {
    --leftTime;
    calcTime(leftTime);

    if (leftTime <= 0) {
      stopTimer();
      finishGame('YOU LOST😓');
      soundPlay(alertSound);
      return;
    }
  }, 1000);
}

function calcTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function hidePlayButton() {
  playButton.style.visibility = 'hidden';
}

function pickItem(event) {
  if (!started) {
    return;
  }

  let target = event.target;

  if (target.matches('.carrot')) {
    field.removeChild(target);
    leftCarrot++;
    countCarrot(leftCarrot);
    carrotSound.currentTime = 0;
    soundPlay(carrotSound);

    if (CARROT_COUNT === leftCarrot) {
      finishGame('😆YOU WIN💯');
    }
  }

  if (target.matches('.bug')) {
    finishGame('😓YOU LOST');
  }
}

function countCarrot(leftCarrot) {
  carrotCounter.innerText = CARROT_COUNT - leftCarrot;
}

function stopTimer() {
  clearInterval(timeOver);
}

function popUpShow(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove('pop-up__hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up__hide');
}

function showPlayButton() {
  playButton.style.visibility = 'visible';
}

function soundPlay(sound) {
  sound.play();
}

function soundPause(sound) {
  sound.pause();
}

playButton.addEventListener('click', () => {
  if (!started) {
    startGame();
  } else {
    stopGame();
  }
});

replayButton.addEventListener('click', () => {
  hidePopUp();
  showPlayButton();
  startGame();
});

field.addEventListener('click', pickItem);
