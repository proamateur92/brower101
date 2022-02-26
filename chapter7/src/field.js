'use strict';

const ITEM_SIZE = 80;
import * as sound from './sound.js';

export default class Field {
  constructor(carrotCount, bugCount) {
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('bug', this.bugCount, 'img/bug.png');
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = event => {
    let target = event.target;

    if (target.matches('.carrot')) {
      target.remove();
      this.onItemClick && this.onItemClick('carrot');
      sound.playCarrot();
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  };

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - ITEM_SIZE;
    const y2 = this.fieldRect.height - ITEM_SIZE;

    for (let i = 0; i < count; i++) {
      const items = document.createElement('img');
      items.setAttribute('class', className);
      items.setAttribute('src', imgPath);
      items.style.position = 'absolute';
      let x = fixedLocation(x1, x2);
      let y = fixedLocation(y1, y2);

      items.style.left = `${x}px`;
      items.style.top = `${y}px`;
      this.field.append(items);
    }
  }
}

function fixedLocation(min, max) {
  return Math.floor(Math.random() * (max - min));
}
