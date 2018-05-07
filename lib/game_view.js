const Game = require('./game.js');

function GameView (){
  this.game = new Game();
}

GameView.prototype.start = function (ctx){
  setInterval(this.game.moveObjects.bind(this.game),20);
  setInterval(this.game.draw.bind(this.game,ctx),20);
}

module.exports = GameView;
