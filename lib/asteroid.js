const Util = require("./util.js");
const MovingObject = require("./moving_object.js");
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

function Asteroid(params) {
  MovingObject.call(this, params);
  this.color = "red";
  this.radius = 30;
  this.vel = Util.randomVec(10);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
    console.log('ship collided')
  }
  if (otherObject instanceof Bullet) {
    this.game.remove(this);
    this.game.remove(otherObject);
    console.log('bullet collided')
  }
};

module.exports = Asteroid;
