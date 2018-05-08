const Game = require("./game.js");

function GameView() {
  this.game = new Game();
}

GameView.prototype.start = function(ctx) {
  this.bindKeyHandlers();
  setInterval(this.game.step.bind(this.game), 50);
  setInterval(this.game.draw.bind(this.game, ctx), 50);
};
GameView.prototype.bindKeyHandlers = function() {
  let ship = this.game.ship;
  for (k in GameView.MOVES) {
    let impulse = GameView.MOVES[k];
    key(k, function() {
      ship.power(impulse);
    });
  }
  key("space", function() {
    let velocity = ship.vel;
    let bullet = new Bullet({pos: , vel: , game:this.game});
  });
};
GameView.MOVES = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0]
};

let normalize = function(vel) {
  let mag = Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2));
  return [vel[0]/mag, vel[1]/mag];
};
module.exports = GameView;
