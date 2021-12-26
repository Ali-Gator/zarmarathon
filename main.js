import { Player } from './JS-library/player.js';
import generateLogs from './JS-library/logs.js';
import showResult from './JS-library/result.js';
import { enemyAttack, playerAttack } from './JS-library/attack.js';
import { $formFight } from './JS-library/DOMelements.js';
import getRandomIntInclusive from './JS-library/utils.js';

export let player1;
export let player2;
class Game {
  getPlayers = async () => {
    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then((res) =>
      res.json()
    );
    return body;
  };

  start = async () => {
    const players = await this.getPlayers();
    const p1 = players[getRandomIntInclusive(0, players.length - 1)];
    const p2 = players[getRandomIntInclusive(0, players.length - 1)];

    player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: 'arenas',
    });

    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas',
    });

    player1.createPlayer();
    player2.createPlayer();

    generateLogs('start', player1, player2);
  };
}
const game = new Game();

game.start();

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();

  const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = enemyAttack();
  const { value: playerValue, hit: playerHit, defence: playerDefence } = playerAttack();

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
