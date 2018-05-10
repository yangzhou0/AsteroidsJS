const MovingObject = require("./moving_object.js");
const Util = require("./util.js");

function Bullet(params) {
  MovingObject.call(this, params);
  this.radius = 5;
  this.color = "black";
}
Util.inherits(Bullet, MovingObject);

Bullet.prototype.move = function(delta) {
  this.pos[0] += this.vel[0]*delta;
  this.pos[1] += this.vel[1]*delta;
  if (this.game.isOutOfBounds(this.pos)) {
    this.game.remove(this);
  }
};
module.exports = Bullet;
