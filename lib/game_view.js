const Game = require("./game.js");
const Bullet = require("./bullet.js");
const Util = require("./util.js");

function GameView(ctx) {
  this.game = new Game();
  this.lastTime = 0;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  game = this.game;
  const img = new Image();
  img.onload = function() {
    let ctx_background = document.getElementById('background-canvas').getContext('2d');
    ctx_background.drawImage(img, 0, 0);
  };
  img.src = "/Users/yangzhou/Desktop/appAcademy/Javascript/asteroids/asst/space.jpg";

  requestAnimationFrame(this.animate.bind(this));
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

GameView.prototype.animate = function(now){
  let delta = now - this.lastTime;
  this.game.step(delta);
  this.game.draw(this.ctx);
  this.lastTime=now;
  requestAnimationFrame(this.animate.bind(this));
}

module.exports = GameView;
