const MovingObject = require('./moving_object.js');

function Ship (params){
  MovingObject.call(this,params);
  this.radius = 10;
  this.color = 'blue';
  this.vel = [0,0];
}

module.exports= Ship;
