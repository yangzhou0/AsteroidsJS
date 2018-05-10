

// const MovingObject = require('./moving_object.js');
// const Asteroid = require('./asteroid.js')
// const Game = require('./game.js');
// window.MovingObject=MovingObject;
// window.Asteroid=Asteroid;
// window.Game =Game;

const GameView = require('./game_view.js');
window.GameView = GameView;


document.addEventListener("DOMContentLoaded", function(event) {
  let ctx = document.getElementById('game-canvas').getContext('2d');
  let game_view = new GameView(ctx);
  game_view.start();
});
