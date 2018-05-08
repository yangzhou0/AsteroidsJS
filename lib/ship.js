const MovingObject = require("./moving_object.js");
const Util = require("./util.js");
const Bullet = require("./bullet.js");

function Ship(params) {
  MovingObject.call(this, params);
  this.radius = 10;
  this.color = "blue";
  this.vel = [0, 0];
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function(impulse) {
  this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
};
Ship.prototype.fireBullet = function() {
  if (this.vel[0] === 0 && this.vel[1] === 0){return false;}
  let bullet = new Bullet({
    pos: this.pos,
    vel: Util.normalize(this.vel),
    game: this.game
  });
  this.game.bullets.push(bullet);
  console.log(`bulelt  vel : ${bullet.vel}`);
  console.log(`ship vel: ${this.vel}`);
};
module.exports = Ship;
