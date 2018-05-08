const Game = require('./game.js');

function GameView (){
  this.game = new Game();
}

GameView.prototype.start = function (ctx){
  this.bindKeyHandlers();
  setInterval(this.game.step.bind(this.game),50);
  setInterval(this.game.draw.bind(this.game,ctx),50);
}
GameView.prototype.bindKeyHandlers = function(){

}

module.exports = GameView;
