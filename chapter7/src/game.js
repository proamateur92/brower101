'use strict';

import Field from './field.js';
import * as sound from './sound.js';

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector('.game__timer');
    this.carrotCounter = document.querySelector('.game__counter');
    this.playButton = document.querySelector('.game__play');

    this.playButton.addEventListener('click', () => {
      if (!this.started) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.timeOver = undefined;
    this.leftCarrot = 0;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.leftCarrot = 0;
    this.gameField.init();
    this.initGame();
    this.showStopButton();
    this.showTimerWithCounter();
    this.startTimer();
    sound.playBackground();
    this.started = true;
  }

  stop() {
    this.stopTimer();
    this.hidePlayButton();
    this.started = false;
    sound.playBug();
    sound.stopBackground();
    this.onGameStop && this.onGameStop('cancel');
  }

  finish(message) {
    this.hidePlayButton();
    this.stopTimer();
    sound.stopBackground();
    this.started = false;
    this.onGameStop && this.onGameStop(message);
  }

  onItemClick = item => {
    if (!this.started) {
      return;
    }

    if (item === 'carrot') {
      this.leftCarrot++;
      this.countCarrot(this.leftCarrot);
      sound.playCarrot();

      if (this.carrotCount === this.leftCarrot) {
        this.finish('win');
        sound.playWin();
      }
    }

    if (item === 'bug') {
      this.finish('lose');
    }
  };

  initGame() {
    this.carrotCounter.innerText = this.carrotCount;
    this.calcTime(this.gameDuration);
  }

  countCarrot(leftCarrot) {
    this.carrotCounter.innerText = this.carrotCount - leftCarrot;
  }

  showStopButton() {
    const icon = document.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }

  showTimerWithCounter() {
    this.gameTimer.style.visibility = 'visible';
    this.carrotCounter.style.visibility = 'visible';
  }

  startTimer() {
    let remainingTimeSec = this.gameDuration;
    this.calcTime(remainingTimeSec);

    this.timeOver = setInterval(() => {
      --remainingTimeSec;
      this.calcTime(remainingTimeSec);

      if (remainingTimeSec <= 0) {
        this.stopTimer();
        this.finish('lose');
        sound.playAlert();
        return;
      }
      this.calcTime(remainingTimeSec);
    }, 1000);
  }

  calcTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerHTML = `${minutes}:${seconds}`;
  }

  hidePlayButton() {
    this.playButton.style.visibility = 'hidden';
  }

  stopTimer() {
    clearInterval(this.timeOver);
  }

  showPlayButton() {
    this.playButton.style.visibility = 'visible';
  }
}
