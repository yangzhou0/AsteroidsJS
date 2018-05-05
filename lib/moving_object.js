function MovingObject (params){
  this.pos = params.pos;
  this.vel = params.vel;
  this.radius = params.radius;
  this.color = params.color;
}


MovingObject.prototype.draw = function(ctx){
  ctx.beginPath();
  ctx.arc(this.pos[0],this.pos[1],this.radius,0, 2*Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill()
}

module.exports = MovingObject;
