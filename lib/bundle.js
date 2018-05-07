/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

console.log('Wekpack is working');
console.log('hi');

// const MovingObject = require('./moving_object.js');
// const Asteroid = require('./asteroid.js')
// const Game = require('./game.js');
// window.MovingObject=MovingObject;
// window.Asteroid=Asteroid;
// window.Game =Game;

const GameView = __webpack_require__(6);
window.GameView = GameView;


document.addEventListener("DOMContentLoaded", function(event) {
  let ctx = document.getElementById('game-canvas').getContext('2d');
  let game_view = new GameView();
  game_view.start(ctx);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
}


module.exports = MovingObject;


//{ pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Util = {
  inherits: function inherits(childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },
  randomVec: function randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale: function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
}


module.exports = Util;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(2);
const MovingObject = __webpack_require__(1);



function Asteroid (params){
  MovingObject.call(this,params);
  this.color = 'red';
  this.radius = 10;
  this.vel = Util.randomVec(10);
}

Util.inherits(Asteroid,MovingObject);

module.exports = Asteroid;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(4);
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(5);

function GameView (){
  this.game = new Game();
}

GameView.prototype.start = function (ctx){
  setInterval(this.game.moveObjects.bind(this.game),20);
  setInterval(this.game.draw.bind(this.game,ctx),20);
}

module.exports = GameView;


/***/ })
/******/ ]);