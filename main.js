const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['gun', 'sword'],
  attack: function (name) {
    console.log(name + ' Fight...');
  },
};

const player2 = {
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['gun', 'sword'],
  attack: function (name) {
    console.log(name + ' Fight...');
  },
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

function changeHP(playerObj) {
  const $playerLife = document.querySelector(
    '.player' + playerObj.player + ' .life'
  );
  playerObj.hp -= getRandomIntInclusive(1, 20);

  if (playerObj.hp < 0) {
    playerObj.hp = 0;
  }

  $playerLife.style.width = playerObj.hp + '%';
}

function playerWin(name) {
  const $winTitle = createElement('div', 'winTitle');
  $winTitle.innerText = name + ' wins';
  return $winTitle;
}

$randomButton.addEventListener('click', function () {
  changeHP(player1);
  changeHP(player2);

  if (player1.hp === 0) {
    $arenas.appendChild(playerWin(player2.name));
    $randomButton.disabled = true;
  } else if (player2.hp === 0) {
    $arenas.appendChild(playerWin(player1.name));
    $randomButton.disabled = true;
  }
});
