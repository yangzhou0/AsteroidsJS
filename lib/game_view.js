const Game = require("./game.js");
const Bullet = require("./bullet.js");
const Util = require("./util.js");

function GameView() {
  this.game = new Game();
}

GameView.prototype.start = function(ctx) {
  this.bindKeyHandlers();
  game = this.game;

  const img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  };
  img.src = "/Users/yangzhou/Desktop/appAcademy/Javascript/asteroids/asst/space.jpg";

  setInterval(function() {
    game.draw.call(this.game, ctx);
    game.step.call(this.game);
  }, 20);
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
    ship.fireBullet();
  });
};
GameView.MOVES = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0]
};

module.exports = GameView;
