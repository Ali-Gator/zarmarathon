import { $formFight } from './DOMelements.js';

export const attack = async () => {
  const playerInputs = {};

  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      playerInputs.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      playerInputs.defence = item.value;
    }
  }

  const data = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
    method: 'POST',
    body: JSON.stringify(playerInputs),
  }).then((res) => res.json());

  return data;
};
