const Game = require("./game.js");
const Bullet = require("./bullet.js");

function GameView() {
  this.game = new Game();
}

GameView.prototype.start = function(ctx) {
  this.bindKeyHandlers();
  game = this.game;
  setInterval(function() {
    game.draw.call(this.game, ctx);
    game.step.call(this.game);
  }, 50);
};
GameView.prototype.bindKeyHandlers = function() {
  let ship = this.game.ship;
  let thisgame = this.game;
  for (k in GameView.MOVES) {
    let impulse = GameView.MOVES[k];
    key(k, function() {
      ship.power(impulse);
      console.log("moved");
    });
  }
  key("space", function() {
    let velocity = ship.vel;
    let bullet = new Bullet({
      pos: ship.pos,
      vel: normalize(ship.vel),
      game: thisgame
    });
    thisgame.bullets.push(bullet);
    console.log(`bulelt  vel : ${bullet.vel}`);
    console.log(`ship vel: ${ship.vel}`)

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
  return [vel[0] / mag * 10, vel[1] / mag * 10];
};
module.exports = GameView;
