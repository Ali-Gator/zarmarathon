const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

function changeHP(value) {
  this.hp -= value;

  if (this.hp < 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
  const a = this.elHP();
  return (a.style.width = this.hp + '%');
}

const player1 = {
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['gun', 'sword'],
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['gun', 'sword'],
  changeHP,
  elHP,
  renderHP,
};

function createElement(tagName, className) {
  const $tag = document.createElement(tagName);

  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer(playerObj) {
  const $player = createElement('div', 'player' + playerObj.player);
  const $progressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = playerObj.hp + '%';
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;

  $player.appendChild($progressbar);
  $player.appendChild($character);

  $progressbar.appendChild($life);
  $progressbar.appendChild($name);

  $character.appendChild($img);

  return $player;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function playerWin(name) {
  const $winTitle = createElement('div', 'winTitle');

  if (name) {
    $winTitle.innerText = name + ' wins';
  } else {
    $winTitle.innerText = 'draw';
  }
  return $winTitle;
}

function createReloadButton() {
  const $divReload = createElement('div', 'reloadWrap');
  const $elButton = createElement('button', 'button');

  $divReload.style.position = 'absolute';
  $divReload.style.top = '10%';
  $divReload.style.zIndex = '1000';
  $divReload.style.left = '50%';
  $divReload.style.transform = 'translate(-50%, 0%)';

  $elButton.style.marginTop = '0';
  $elButton.innerText = 'restart';

  $divReload.appendChild($elButton);

  return $divReload;
}

function enemyAttack() {
  const hit = ATTACK[getRandomIntInclusive(0, 2)];
  const defence = ATTACK[getRandomIntInclusive(0, 2)];

  return {
    value: getRandomIntInclusive(1, HIT[hit]),
    hit,
    defence,
  };
}

function playerAttack() {
  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandomIntInclusive(1, HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }
}

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    $fightButton.disabled = true;

    const $reloadButton = createReloadButton();
    $arenas.appendChild($reloadButton);
    $reloadButton.addEventListener('click', function () {
      window.location.reload();
    });
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWin(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWin(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
  }
}

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (enemy.hit !== player.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
  }

  if (player.hit !== enemy.defence) {
    player2.changeHP(player.value);
    player2.renderHP();
  }
  showResult();
});
