import Player from '../class/Player.js';
import Logs from './Logs.js';
import { LOGS } from '../constants.js';
import { createElement } from '../utils.js';

class Game {
  constructor({ root, form, chat }) {
    this.root = root;
    this.form = form;
    this.chat = chat;
    this.logs = new Logs({
      root: chat,
      logs: LOGS,
    });
  }

  start = async () => {
    const human = JSON.parse(localStorage.getItem('player1'));
    const computer = await this.getPlayer();
    const $rootSelector = document.querySelector(`.${this.root}`);
    const $fightButton = document.querySelector('.button');

    const player1 = new Player({
      ...human,
      player: 1,
      rootSelector: this.root,
    });

    const player2 = new Player({
      ...computer,
      player: 2,
      rootSelector: this.root,
    });

    player1.createPlayer();
    player2.createPlayer();

    this.logs.generateLogs('start', player1, player2);

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { player1: playerAttack, player2: enemyAttack } = await this.attack();
      const { value: playerValue, hit: playerHit, defence: playerDefence } = playerAttack;
      const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = enemyAttack;

      if (enemyHit !== playerDefence) {
        const damage = enemyValue;
        player1.changeHP(damage);
        player1.renderHP();
        this.logs.generateLogs('hit', player1, player2, damage);
      } else {
        this.logs.generateLogs('defence', player1, player2);
      }

      if (playerHit !== enemyDefence) {
        const damage = playerValue;
        player2.changeHP(damage);
        player2.renderHP();
        this.logs.generateLogs('hit', player2, player1, damage);
      } else {
        this.logs.generateLogs('defence', player2, player1);
      }

      this.showResult(player1, player2, $fightButton, $rootSelector);
    });
  };

  getPlayer = async () => {
    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then((res) =>
      res.json()
    );
    return body;
  };

  attack = async () => {
    const playerInputs = {};

    for (let item of this.form) {
      if (item.checked && item.name === 'hit') {
        playerInputs.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
        playerInputs.defence = item.value;
      }
      item.checked = false;
    }

    const data = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
      method: 'POST',
      body: JSON.stringify(playerInputs),
    }).then((res) => res.json());

    return data;
  };

  showResult = (player1, player2, $fightButton, $rootSelector) => {
    if (player1.hp === 0 || player2.hp === 0) {
      $fightButton.disabled = true;
      const $reloadButton = this.createReloadButton();
      $rootSelector.appendChild($reloadButton);
      $reloadButton.addEventListener('click', function () {
        window.location.pathname = '../../index.html';
      });
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
      $rootSelector.appendChild(this.playerWin(player2.name));
      this.logs.generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      $rootSelector.appendChild(this.playerWin(player1.name));
      this.logs.generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
      $rootSelector.appendChild(this.playerWin());
      this.logs.generateLogs('draw');
    }
  };

  createReloadButton = () => {
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
  };

  playerWin = (name) => {
    const $winTitle = createElement('div', 'winTitle');

    if (name) {
      $winTitle.innerText = name + ' wins';
    } else {
      $winTitle.innerText = 'draw';
    }
    return $winTitle;
  };
}

export default Game;
