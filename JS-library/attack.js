import getRandomIntInclusive from './utils.js';
import { $formFight } from './DOMelements.js';

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

 export const enemyAttack = () => {
  const hit = ATTACK[getRandomIntInclusive(0, 2)];
  const defence = ATTACK[getRandomIntInclusive(0, 2)];

  return {
    value: getRandomIntInclusive(1, HIT[hit]),
    hit,
    defence,
  };
};

export const playerAttack = () => {
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
};
