function Game (){
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X =1000;
Game.DIM_Y =1000;
Game.NUM_ASTEROIDS =10;


Game.prototype.addAsteroids= function(){
  let position;
  for (let i = 1; i < Game.NUM_ASTEROIDS; i ++){
    position = this.randomPosition();
    this.asteroids.push(new Asteroid({pos: position}))
  }
}



Game.prototype.randomPosition = function(){
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
}
