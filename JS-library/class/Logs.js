import { getRandomIntInclusive } from '../utils.js';

class Logs {
  constructor({ root, logs }) {
    this.root = root;
    this.logs = logs;
  }

  generateLogs = (type, player1, player2, damage) => {
    let text = this.generateText(type, player1, player2);
  
    switch (type) {
      case 'hit':
        text = `${this.getTime()} - ${text} Урон: -${damage}. Остаток здоровья: ${player1.hp} из 100`;
        break;
  
      case 'defence':
      case 'draw':
      case 'end':
        text = `${this.getTime()} - ${text}`;
        break;
  
      default:
        text;
        break;
    }
  
    this.root.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
  };

  generateText = (situation, player1, player2) => {
    let logText = this.getLogString(this.logs, situation);
  
    switch (situation) {
      case 'start':
        return logText
          .replace('[time]', this.getTime())
          .replace('[player1]', player1.name)
          .replace('[player2]', player2.name);
  
      case 'hit':
      case 'defence':
        return logText.replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name);
  
      case 'end':
        return logText.replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
  
      case 'draw':
        return logText;
    }
  };

  getLogString = (logObj, index) => {
    if (typeof logObj[index] === 'string') {
      return logObj[index];
    } else if (Array.isArray(logObj[index])) {
      return logObj[index][getRandomIntInclusive(0, logObj[index].length - 1)];
    }
  };

  getTime = () => {
    const date = new Date();
    return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
  };
}

export default Logs;
