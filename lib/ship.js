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
}

module.exports = Ship;
