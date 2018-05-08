const Util = require('./util.js');
const MovingObject = require('./moving_object.js');



function Asteroid (params){
  MovingObject.call(this,params);
  this.color = 'red';
  this.radius = 30;
  this.vel = Util.randomVec(10);
}

Util.inherits(Asteroid,MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};

module.exports = Asteroid;
