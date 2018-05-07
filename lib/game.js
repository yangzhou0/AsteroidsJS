const Asteroid = require("./asteroid.js");
function Game() {
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X = 1200;
Game.DIM_Y = 1200;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  let position;
  for (let i = 1; i <= Game.NUM_ASTEROIDS; i++) {
    position = this.randomPosition();
    this.asteroids.push(new Asteroid({ pos: position }));
  }
};

Game.prototype.randomPosition = function() {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);
  this.asteroids.forEach(asteroid => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function (){
  this.asteroids.forEach((asteroid)=>{
    asteroid.move();
  })
}

Game.prototype.wrap = function(pos){
  if (pos[0]>=0){let x = pos[0] % Game.DIM_X;}
  else {let x = pos[0] % Game.DIM_X + Game.DIM_X;}
  if (pos[1]>=0) {let y = pos[1] % Game.DIM_Y;}
  else {let y = pos[1] % Game.DIM_Y + Game.DIM_Y;}
  return [x,y];
}

module.exports = Game;
