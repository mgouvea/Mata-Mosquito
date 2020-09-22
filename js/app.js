let heightWindow = 0;
let widthWindow = 0;
let lifes = 3;
let time = 100;
let level = window.location.search;
let mosquitoTime = 1500;

// selecionando nível
level = level.replace('?', '');

if (level === 'normal') {
  mosquitoTime = 1500;
  time = 20;
} else if (level === 'hard') {
  mosquitoTime = 1000;
  time = 35;
} else if (level === 'extraHard') {
  mosquitoTime = 750;
  time = 50;
}

function renderWidthHeightGame() {
  heightWindow = window.innerHeight;
  widthWindow = window.innerWidth;
}

renderWidthHeightGame();

// cronometrando a vitória
let timer = setInterval(() => {
  if (time < 0) {
    clearInterval(timer);
    clearInterval(createMosquito);
    window.location.href = 'win.html';
  } else {
    document.querySelector('#timer').innerHTML = time;
  }
  time -= 1;
}, 1000);

function positionMosquito() {
  // remover mosquito anterior
  const mosquitoID = document.querySelector('#mosquito');
  let lifeID = document.querySelector(`#l${lifes}`);

  if (mosquitoID) {
    mosquitoID.remove();
    if (lifes === 1) {
      window.location.href = 'gameOver.html';
    } else {
      lifeID.src = 'imagens/coracao_vazio.png';
      lifes--;
    }
  }

  let positionX = Math.floor(Math.random() * widthWindow) - 100;
  let positionY = Math.floor(Math.random() * heightWindow) - 100;

  positionX = positionX < 0 ? 0 : positionX;
  positionY = positionY < 0 ? 0 : positionY;

  // criar elemento html
  let mosquito = document.createElement('img');

  mosquito.src = 'imagens/mosquito.png';
  mosquito.className = `${randomSizeMosquito()} ${randomSideMosquito()}`;
  mosquito.style.left = `${positionX}px`;
  mosquito.style.top = `${positionY}px`;
  mosquito.style.position = `absolute`;
  mosquito.id = 'mosquito';
  mosquito.onclick = function () {
    soundKillMosquito();
    this.remove();
  };

  document.body.appendChild(mosquito);
}
// exibindo mosquito de acordo com o tempo
let createMosquito = setInterval(() => {
  positionMosquito();
}, mosquitoTime);

function randomSizeMosquito() {
  let classMosquitoSize = Math.floor(Math.random() * 3);

  switch (classMosquitoSize) {
    case 0:
      return 'mosquito1';
    case 1:
      return 'mosquito2';
    case 2:
      return 'mosquito3';
  }
}

function randomSideMosquito() {
  let classMosquitoSide = Math.floor(Math.random() * 2);

  switch (classMosquitoSide) {
    case 0:
      return 'sideA';
    case 1:
      return 'sideB';
  }
}

function soundMosquito() {
  let audio = new Audio();
  audio.src = 'sons/somMosquito.m4a';
  audio.play();
}

function soundKillMosquito() {
  let audioKill = new Audio();
  audioKill.src = 'sons/killSound.mp3';
  audioKill.play();
}

soundMosquito();
