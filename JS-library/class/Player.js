import { createElement } from '../utils.js';

class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.rootSelector = props.rootSelector;
  }

  changeHP = (value) => {
    this.hp -= value;

    if (this.hp < 0) {
      this.hp = 0;
    }
  };

  elHP = () => {
    return document.querySelector(`.player${this.player} .life`);
  };

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`;
  };

  createPlayer = () => {
    const $player = createElement('div', `player${this.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');
    const $rootSelector = document.querySelector(`.${this.rootSelector}`);

    $life.style.width = `${this.hp}%`;
    $name.innerText = this.name;
    $img.src = this.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    $rootSelector.appendChild($player);
  };
}

export default Player;
