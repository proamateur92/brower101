// 1. 객체화
const body = document.querySelector('body');
const play = document.querySelector('.play');
const timer = document.querySelector('.timer');
const counter = document.querySelector('.counter');
const header = document.querySelector('.header__item');
const bodyHalfWidth = body.getBoundingClientRect().height / 2;
const target = document.querySelector('.target');

function randomPosition() {
  target.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const newWidth = Math.floor(Math.random() * 1500 + 1);
    const newHeight = Math.floor(Math.random() * 150 + 1);
    target.innerHTML += `<i class='bug' style='transform:translate(${newWidth}px,${newHeight}px)'></i>`;
  }
  for (let i = 0; i < 10; i++) {
    const newWidth = Math.floor(Math.random() * 1500 + 1);
    const newHeight = Math.floor(Math.random() * bodyHalfWidth + 1);
    target.innerHTML += `<i class='carrot' data-id='${i}' style='transform:translate(${newWidth}px,${newHeight}px)'></i>`;
  }
  const howMany = document.querySelectorAll('.carrot');
  counter.innerText = howMany.length;
}

function pop(result) {
  header.innerHTML += `<div class="message">${result}</div>`;
}

// 2. 시작 클릭
play.addEventListener('click', () => {
  // 2-1. 중단 버튼으로 변환
  play.innerText = '중단';
  // 1) 요소 랜덤 배치
  randomPosition();

  target.addEventListener('click', e => {
    if (e.target.className === 'carrot') {
      const id = e.target.dataset.id;
      const remove = document.querySelector(`.carrot[data-id="${id}"]`);
      remove.remove();
      const howMany = document.querySelectorAll('.carrot');
      counter.innerText = howMany.length;
      return;
    }

    play.style.transform = `translateY(485px)`;
    play.innerText = '다시';
    if (e.target.className === 'bug') {
      pop('YOU LOST ㅠㅠ');
      return;
    }
  });
  // 2) 타이머
  const timeArr = [1,2,3,4,5]
  let time = setInterval(decrease, 500, timeArr) {
    function :decrease(timeArr) {
      console.log(timeArr);
    }
  }
  // 3) 마리 수 카운트
});


// 4) 벌레 클릭하면 or 타이머 다 되면 종료
// 4-1)
// retry 메시지 띄우기
