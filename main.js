import { player1, player2, createPlayer } from './JS-library/player.js';
import generateLogs from './JS-library/logs.js';
import showResult from './JS-library/result.js';
import { enemyAttack, playerAttack } from './JS-library/attack.js';
import { $arenas, $formFight} from './JS-library/DOMelements.js';

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1, player2);

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
