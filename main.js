const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  ],
  draw: 'Ничья - это тоже победа!',
};

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
  return attack;
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
    generateLogs('end', player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWin(player1.name));
    generateLogs('end', player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
    generateLogs('draw');
  }
}

function getLogString(logObj, index) {
  if (typeof logObj[index] === 'string') {
    return logObj[index];
  } else if (Array.isArray(logObj[index])) {
    return logObj[index][getRandomIntInclusive(0, logObj[index].length - 1)];
  }
}

function getTime() {
  const date = new Date();
  return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
}

function generateText(situation, player1, player2) {
  let logText = getLogString(logs, situation);

  switch (situation) {
    case 'start':
      return logText
        .replace('[time]', getTime())
        .replace('[player1]', player1.name)
        .replace('[player2]', player2.name);

    case 'hit':
    case 'defence':
      return logText.replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name);

    case 'end':
      return logText.replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);

    case 'draw':
      return logText;
  }
}

function generateLogs(type, player1, player2, damage) {
  let text = generateText(type, player1, player2);

  switch (type) {
    case 'hit':
      text = `${getTime()} - ${text} Урон: -${damage}. Остаток здоровья: ${player1.hp}`;
      break;

    case 'defence':
    case 'draw':
    case 'end':
      text = `${getTime()} - ${text}`;
      break;

    default:
      text;
      break;
  }

  $chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
}

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();
  console.log(enemy);
  console.log(player);

  const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = enemy;
  const { value: playerValue, hit: playerHit, defence: playerDefence } = player;


  if (enemyHit !== playerDefence) {
    const damage = enemyValue;
    player1.changeHP(damage);
    player1.renderHP();
    generateLogs('hit', player1, player2, damage);
  } else {
    generateLogs('defence', player1, player2);
  }

  if (playerHit !== enemyDefence) {
    const damage = playerValue;
    player2.changeHP(damage);
    player2.renderHP();
    generateLogs('hit', player2, player1, damage);
  } else {
    generateLogs('defence', player2, player1);
  }
  showResult();
});
