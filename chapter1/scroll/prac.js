const scrollBy = document.querySelector('.scroll__by');
const scrollTo = document.querySelector('.scroll__to');
const scrollInto = document.querySelector('.scroll__into');
const section = document.querySelector('.section');
let check = false;

scrollBy.addEventListener('click', () => {
  window.scrollBy(0, 200);
});

scrollTo.addEventListener('click', () => {
  window.scrollTo(0, 200);
});

scrollInto.addEventListener('click', () => {
  special.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

if (!check) {
  init();
  check = true;
}

const special = document.querySelector('.special');

function init() {
  for (let i = 1; i <= 15; i++) {
    const box = document.createElement('div');

    if (i === 9) {
      box.setAttribute('class', `special`);
      section.appendChild(box);
      continue;
    }
    box.setAttribute('class', `box box${i}`);
    section.appendChild(box);
  }
}
