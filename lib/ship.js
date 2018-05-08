const MovingObject = require("./moving_object.js");
const Util = require("./util.js");

function Ship(params) {
  MovingObject.call(this, params);
  this.radius = 10;
  this.color = "blue";
  this.vel = [0, 0];
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function(){
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
}

Ship.prototype.power = function(impulse) {
  this.vel = [this.vel[0]+impulse[0],this.vel[1]+impulse[1]]];
}

module.exports = Ship;
