'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.replayButton = document.querySelector('.pop-up__replay');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.replayButton.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  show(text) {
    this.popUpMessage.innerText = text;
    this.popUp.classList.remove('pop-up__hide');
  }

  hide() {
    this.popUp.classList.add('pop-up__hide');
  }
}
