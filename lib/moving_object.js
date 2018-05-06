function MovingObject (params){
  this.pos = params.pos;
  this.vel = params.vel;
  this.radius = params.radius;
  this.color = params.color;
}


MovingObject.prototype.draw = function(ctx){
  // var ctx = ctx.getContext('2d');
  ctx.beginPath();
  ctx.arc(this.pos[0],this.pos[1],this.radius,0, 2*Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill()
}

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
}


module.exports = MovingObject;


//{ pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
