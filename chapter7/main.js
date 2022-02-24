// 1. 객체화
const body = document.querySelector('body');
const play = document.querySelector('.play');
const timer = document.querySelector('.timer');
const counter = document.querySelector('.counter');
const header = document.querySelector('.header__item');
const target = document.querySelector('.target');
let message;

function randomPosition() {
  target.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const newWidth = Math.floor(Math.random() * 1200 + 1);
    const newHeight = Math.floor(Math.random() * 230 + 1);
    target.innerHTML += `<i class='bug' style='transform:translate(${newWidth}px,${newHeight}px)'></i>`;
  }

  for (let i = 0; i < 10; i++) {
    const newWidth = Math.floor(Math.random() * 1200 + 1);
    const newHeight = Math.floor(Math.random() * 230 + 1);
    target.innerHTML += `<i class='carrot' data-id='${i}' style='transform:translate(${newWidth}px,${newHeight}px)'></i>`;
  }

  const howMany = document.querySelectorAll('.carrot');
  counter.innerText = howMany.length;
}

function eventCarrot(e) {
  const id = e.target.dataset.id;
  const remove = document.querySelector(`.carrot[data-id="${id}"]`);
  remove.remove();
  const howMany = document.querySelectorAll('.carrot');
  counter.innerText = howMany.length;

  if (howMany.length === 0) {
    play.style.transform = `translateY(380px)`;
    play.innerText = '다시';
    pop('YOU WON!!');
  }
}

function eventBug() {
  play.style.transform = `translateY(380px)`;
  play.innerText = '다시';
  pop('YOU LOST ㅠㅠ');
}

function pop(result) {
  message = document.createElement('div');
  message.setAttribute('class', 'message');
  message.innerText = result;
  header.appendChild(message);
}

header.addEventListener('click', e => {
  if (play.innerText === '다시') {
    header.removeChild(message);
    play.style.transform = `translateY(0px)`;
    play.innerText = '중단';
    randomPosition();
  } else if (play.innerText === '중단') {
    play.style.transform = `translateY(380px)`;
    play.innerText = '다시';
    pop('YOU LOST ㅠㅠ');
  }

  if (play.innerText === '클릭') {
    randomPosition();
    play.innerText = '중단';
  }
});

target.addEventListener('click', e => {
  if (e.target.className === 'carrot') {
    eventCarrot(e);
    return;
  }

  if (e.target.className === 'bug') {
    eventBug();
    return;
  }
});
