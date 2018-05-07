const Game = require('./game.js');

function GameView (){
  this.game = new Game();
  this.ctx = document.getElementById('game-canvas').getContext('2d');
}

GameView.prototype.start = function (){
  setInterval(this.game.moveObjects.bind(this.game),20);
  setInterval(this.game.draw.bind(this.game,this.ctx),20);
}

module.exports = GameView;
