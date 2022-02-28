'use strict';
const section = document.querySelector('.section');
const findBtn = document.querySelector('.find__button');

init();

function init() {
  for (let i = 0; i <= 9; i++) {
    const dotori = document.createElement('img');
    if (i === 5) {
      const squirrel = document.createElement('img');
      squirrel.setAttribute('class', 'squirrel');
      squirrel.setAttribute('src', '../img/squirrel.png');
      section.appendChild(squirrel);
      continue;
    }
    dotori.setAttribute('class', 'dotori');
    dotori.setAttribute('src', '../img/dotori.png');
    section.appendChild(dotori);
  }
}

const squirrel = document.querySelector('.squirrel');
findBtn.addEventListener('click', () => {
  squirrel.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
