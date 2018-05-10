function MovingObject(params) {
  this.pos = params.pos;
  this.vel = params.vel;
  this.radius = params.radius;
  this.color = params.color;
  this.game = params.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function(delta=1) {
  let x = this.pos[0] + this.vel[0]*delta;
  let y = this.pos[1] + this.vel[1]*delta;
  this.pos = this.game.wrap([x, y]);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  let distance = Math.sqrt(
    Math.pow(this.pos[0] - otherObject.pos[0], 2) +
      Math.pow(this.pos[1] - otherObject.pos[1], 2)
  );
  let radii = this.radius + otherObject.radius;
  if (distance < radii) {
    return true;
  }
  return false;
};

MovingObject.prototype.collideWith = function(otherObject) {
  this.game.remove(this);
  this.game.remove(otherObject);
};

module.exports = MovingObject;
