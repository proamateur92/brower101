'use strict';

import PopUp from './popup.js';
import Game from './game.js';

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
  game.showPlayButton();
});

const game = new Game(4, 2, 2);
game.setGameStopListener(reason => {
  console.log(reason);
  let message;
  switch (reason) {
    case 'cancel':
      message = 'RETRY?';
      break;
    case 'win':
      message = '😆YOU WIN💯';
      break;
    case 'lose':
      message = '😓YOU LOST';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.show(message);
});
