import { createElement } from '../utils.js';

class PlayerChoice {
  constructor({ root, player }) {
    this.root = root;
    this.player = player;
  }

  async init() {
    localStorage.removeItem('player1');

    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(
      (res) => res.json()
    );
    let imgSrc = null;
    this.createEmptyPlayerBlock();

    players.forEach((item) => {
      const el = createElement('div', ['character', `div${item.id}`]);
      const img = createElement('img');

      el.addEventListener('mousemove', () => {
        if (imgSrc === null) {
          imgSrc = item.img;
          const $img = createElement('img');
          $img.src = imgSrc;
          this.player.appendChild($img);
        }
      });

      el.addEventListener('mouseout', () => {
        if (imgSrc) {
          imgSrc = null;
          this.player.innerHTML = '';
        }
      });

      el.addEventListener('click', () => {
        localStorage.setItem('player1', JSON.stringify(item));

        el.classList.add('active');

        setTimeout(() => {
            window.location.pathname = '../../pages/arenas.html';
        }, 1000);
      });

      img.src = item.avatar;
      img.alt = item.name;

      el.appendChild(img);
      this.root.appendChild(el);
    });
  }

  createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = 'https://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    this.root.appendChild(el);
  }
}

export default PlayerChoice;
