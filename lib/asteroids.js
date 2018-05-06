console.log('Wekpack is working');
console.log('hi');

const MovingObject = require('./moving_object.js');

function Asteroids (params){
  MovingObject.call(this,params);
  this.color = 'red';
  this.radius = '10px';
  this.vel = Util.randomVec(10);
}
