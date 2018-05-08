const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");
const Bullet = require('./bullet.js');

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({ pos: this.randomPosition(), game: this });
  this.bullets = [];
}

Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 1;

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
  this.ship.draw(ctx);
  this.bullets.forEach((bullet)=>{
    bullet.draw(ctx);
  })
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(asteroid => {
    asteroid.move();
  });
  this.bullets.forEach(bullet => {
    bullet.move();
  });
  this.ship.move();
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
  let ship = this.ship;
  let bullets = this.bullet;
  for (let i = 0; i < this.asteroids.length; i++) {
    if (this.asteroids[i].isCollidedWith(ship)) {
      this.asteroids[i].collideWith(ship);
    }
    for (let j = 0; j < this.bullets.length; j++) {
      if (this.asteroids[i].isCollidedWith(this.bullets[j])) {
        this.asteroids[i].collideWith(this.bullets[j]);
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(obj) {
  if (obj instanceof Asteroid) {
    let idx = this.asteroids.indexOf(obj);
    this.asteroids.splice(idx, 1);
  } else if (obj instanceof Bullet) {
    let idx = this.bullets.indexOf(obj);
    this.bullets.splice(idx, 1);
  }
};

module.exports = Game;
