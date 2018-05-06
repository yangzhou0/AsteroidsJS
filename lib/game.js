function Game (){
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X =
Game.DIM_Y =
Game.NUM_ASTEROIDS =


Game.prototype.addAsteroids= function(){
  this.asteroids
}



Game.prototype.randomPosition = function(){
  return [Math.random() * Game.DIM_X,Math.random() * Game.DIM_Y];
}
