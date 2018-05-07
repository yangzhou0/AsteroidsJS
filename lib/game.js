const Asteroid = require("./asteroid.js");
function Game() {
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 2;

Game.prototype.addAsteroids = function() {
  let position;
  for (let i = 1; i <= Game.NUM_ASTEROIDS; i++) {
    position = this.randomPosition();
    this.asteroids.push(new Asteroid({ pos: position, game: this }));
  }
};

Game.prototype.randomPosition = function() {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach(asteroid => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(asteroid => {
    asteroid.move();
  });
};

Game.prototype.wrap = function(pos) {
  let x;
  let y;
  if (pos[0] >= 0) {
    x = pos[0] % Game.DIM_X;
  } else {
    x = pos[0] % Game.DIM_X + Game.DIM_X;
  }
  if (pos[1] >= 0) {
    y = pos[1] % Game.DIM_Y;
  } else {
    y = pos[1] % Game.DIM_Y + Game.DIM_Y;
  }
  return [x, y];
};

Game.prototype.checkCollisions = function() {
  for (let i = 0; i < this.asteroids.length; i++) {
    for (let j = i + 1; j < this.asteroids.length; j++) {
      if (asteroids[i].isCollidedWith(asteroids[j])) {
        alert("COLLISION!");
      }
    }
  }
};

module.exports = Game;
