const Util = require('./util.js');
const MovingObject = require('./moving_object.js');



function Asteroid (params){
  MovingObject.call(this,params);
  this.color = 'red';
  this.radius = 10;
  this.vel = Util.randomVec(10);
}

Util.inherits(Asteroid,MovingObject);

module.exports = Asteroid;
