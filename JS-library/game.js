import { Player } from './player.js';
import generateLogs from './logs.js';
import showResult from './result.js';
import { attack } from './attack.js';
import { $formFight } from './DOMelements.js';
import getRandomIntInclusive from './utils.js';

export let player1;
export let player2;

export class Game {
  getPlayers = async () => {
    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then((res) =>
      res.json()
    );
    return body;
  };

  getPlayer = async () => {
    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then((res) =>
      res.json()
    );
    return body;
  };

  start = async () => {
    const players = await this.getPlayers();
    const human = players[getRandomIntInclusive(0, players.length - 1)];
    const computer = await this.getPlayer();

    player1 = new Player({
      ...human,
      player: 1,
      rootSelector: 'arenas',
    });

    player2 = new Player({
      ...computer,
      player: 2,
      rootSelector: 'arenas',
    });

    player1.createPlayer();
    player2.createPlayer();

    generateLogs('start', player1, player2);

    $formFight.addEventListener('submit', async function (e) {
      e.preventDefault();
      const { player1: playerAttack, player2: enemyAttack } = await attack();
      const { value: playerValue, hit: playerHit, defence: playerDefence } = playerAttack;
      const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = enemyAttack;

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
  };
}
