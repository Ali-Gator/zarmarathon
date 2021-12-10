const player1 = {
    name: 'Subzero', 
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun', 'sword'],
    attack: function (name) {
        console.log(name + ' Fight...');
    }
};

const player2 = {
    name: 'Scorpion', 
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun', 'sword'],
    attack: function (name) {
        console.log(name + ' Fight...');
    }
};

const $arenas = document.querySelector('.arenas');

function createPlayer (playerSide, playerNumber) {

    const $playerSide = document.createElement('div');
    $playerSide.classList.add(playerSide);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $playerSide.appendChild($progressbar);
    
    const $character = document.createElement('div');
    $character.classList.add('character');
    $playerSide.appendChild($character);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $progressbar.appendChild($life);
    $life.style.width = playerNumber.hp + '%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $progressbar.appendChild($name);
    $name.innerText = playerNumber.name;

    const $img = document.createElement('img');
    $character.appendChild($img);
    $img.src = playerNumber.img;
    
    $arenas.appendChild($playerSide);
}

createPlayer('player1', player1);
createPlayer('player2', player2);

