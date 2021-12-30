import PlayerChoice from './JS-library/class/PlayerChoice.js';

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

const choice = new PlayerChoice({ root: $parent, player: $player });

choice.init();
