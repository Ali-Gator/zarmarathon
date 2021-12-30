import Game from './class/Game.js';

const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const game = new Game({ root: 'arenas', form: $formFight, chat: $chat });

game.start();
