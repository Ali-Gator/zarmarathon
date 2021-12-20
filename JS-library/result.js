import { $arenas, $fightButton } from './DOMelements.js';
import createElement from './createElement.js';
import { player1, player2 } from './player.js';
import generateLogs from './logs.js';

const createReloadButton = () => {
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

const playerWin = (name) => {
  const $winTitle = createElement('div', 'winTitle');

  if (name) {
    $winTitle.innerText = name + ' wins';
  } else {
    $winTitle.innerText = 'draw';
  }
  return $winTitle;
};

const showResult = () => {
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
};

export default showResult;
