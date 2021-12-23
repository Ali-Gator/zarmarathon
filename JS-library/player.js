import createElement from './createElement.js';

class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
  }

  changeHP = (value) => {
    this.hp -= value;

    if (this.hp < 0) {
      this.hp = 0;
    }
  };

  elHP = () => {
    console.log (this.player);
    return document.querySelector(`.player${this.player} .life`);
  };

  renderHP = () => {
    const a = this.elHP();
    return (a.style.width = `${this.hp}%`);
  };
}

export const player1 = new Player({
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
});

export const player2 = new Player({
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
});

export const createPlayer = ({ player, hp, name, img }) => {
  const $player = createElement('div', `player${player}`);
  const $progressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = `${hp}%`;
  $name.innerText = name;
  $img.src = img;

  $player.appendChild($progressbar);
  $player.appendChild($character);

  $progressbar.appendChild($life);
  $progressbar.appendChild($name);

  $character.appendChild($img);

  return $player;
};
