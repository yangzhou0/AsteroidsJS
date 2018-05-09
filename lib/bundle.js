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



// const MovingObject = require('./moving_object.js');
// const Asteroid = require('./asteroid.js')
// const Game = require('./game.js');
// window.MovingObject=MovingObject;
// window.Asteroid=Asteroid;
// window.Game =Game;

const GameView = __webpack_require__(1);
window.GameView = GameView;


document.addEventListener("DOMContentLoaded", function(event) {
  let ctx = document.getElementById('game-canvas').getContext('2d');
  let game_view = new GameView();
  game_view.start(ctx);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const Bullet = __webpack_require__(7);
const Util = __webpack_require__(4);

function GameView() {
  this.game = new Game();
}

GameView.prototype.start = function(ctx) {
  this.bindKeyHandlers();
  game = this.game;
  const img = new Image();
  img.onload = function() {
    let ctx_background = document.getElementById('background-canvas').getContext('2d');
    ctx_background.drawImage(img, 0, 0);
  };
  img.src = "/Users/yangzhou/Desktop/appAcademy/Javascript/asteroids/asst/space.jpg";

  setInterval(function() {

    game.draw.call(this.game, ctx);
    game.step.call(this.game);
  }, 20);
};
GameView.prototype.bindKeyHandlers = function() {
  let ship = this.game.ship;
  let thisgame = this.game;
  for (k in GameView.MOVES) {
    let impulse = GameView.MOVES[k];
    key(k, function() {
      ship.power(impulse);
      console.log("moved");
    });
  }
  key("space", function() {
    ship.fireBullet();
  });
};
GameView.MOVES = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0]
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(3);
const Ship = __webpack_require__(6);
const Bullet = __webpack_require__(7);

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({ pos: this.randomPosition(), game: this });
  this.bullets = [];
}

Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 1;

Game.prototype.addAsteroids = function() {
  let position;
  for (let i = 1; i <= Game.NUM_ASTEROIDS; i++) {
    position = this.randomPosition();
    this.asteroids.push(new Asteroid({ pos: position, game: this }));
  }
};

Game.prototype.randomPosition = function() {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);


  this.asteroids.forEach(asteroid => {
    asteroid.draw(ctx);
  });
  this.ship.draw(ctx);
  this.bullets.forEach(bullet => {
    bullet.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(asteroid => {
    asteroid.move();
  });
  this.bullets.forEach(bullet => {
    bullet.move();
  });
  this.ship.move();
};

Game.prototype.wrap = function(pos) {
  let x;
  let y;
  if (pos[0] >= 0) {
    x = pos[0] % Game.DIM_X;
  } else {
    x = pos[0] % Game.DIM_X + Game.DIM_X;
  }
  if (pos[1] >= 0) {
    y = pos[1] % Game.DIM_Y;
  } else {
    y = pos[1] % Game.DIM_Y + Game.DIM_Y;
  }
  return [x, y];
};

Game.prototype.checkCollisions = function() {
  let ship = this.ship;
  let bullets = this.bullet;
  for (let i = 0; i < this.asteroids.length; i++) {
    if (this.asteroids[i].isCollidedWith(ship)) {
      this.asteroids[i].collideWith(ship);
    }
    for (let j = 0; j < this.bullets.length; j++) {
      if (this.asteroids[i].isCollidedWith(this.bullets[j])) {
        this.asteroids[i].collideWith(this.bullets[j]);
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(obj) {
  if (obj instanceof Asteroid) {
    let idx = this.asteroids.indexOf(obj);
    this.asteroids.splice(idx, 1);
  } else if (obj instanceof Bullet) {
    let idx = this.bullets.indexOf(obj);
    this.bullets.splice(idx, 1);
  }
};

Game.prototype.isOutOfBounds = function(pos) {
  return pos[0] > Game.DIM_X || pos[0] < 0 || pos[1] > Game.DIM_Y || pos[1] < 0;
};

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(5);
const Ship = __webpack_require__(6);
const Bullet = __webpack_require__(7);

function Asteroid(params) {
  MovingObject.call(this, params);
  this.color = "red";
  this.radius = 30;
  this.vel = Util.randomVec(10);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
    console.log('ship collided')
  }
  if (otherObject instanceof Bullet) {
    this.game.remove(this);
    this.game.remove(otherObject);
    console.log('bullet collided')
  }
};

module.exports = Asteroid;


/***/ }),
/* 4 */
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
  },
  normalize: function(vel) {
    let mag = Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2));
    return [vel[0] / mag * 10, vel[1] / mag * 10];
  }
};

module.exports = Util;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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

MovingObject.prototype.move = function() {
  let x = this.pos[0] + this.vel[0];
  let y = this.pos[1] + this.vel[1];
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

//{ pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(5);
const Util = __webpack_require__(4);
const Bullet = __webpack_require__(7);

function Ship(params) {
  MovingObject.call(this, params);
  this.radius = 10;
  this.color = "blue";
  this.vel = [0, 0];
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function(impulse) {
  this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
};
Ship.prototype.fireBullet = function() {
  if (this.vel[0] === 0 && this.vel[1] === 0){return false;}
  let bullet = new Bullet({
    pos: this.pos,
    vel: Util.normalize(this.vel),
    game: this.game
  });
  this.game.bullets.push(bullet);
  console.log(`bulelt  vel : ${bullet.vel}`);
  console.log(`ship vel: ${this.vel}`);
};
module.exports = Ship;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(5);
const Util = __webpack_require__(4);

function Bullet(params) {
  MovingObject.call(this, params);
  this.radius = 5;
  this.color = "black";
}
Util.inherits(Bullet, MovingObject);

Bullet.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.game.isOutOfBounds(this.pos)) {
    this.game.remove(this);
  }
};
module.exports = Bullet;


/***/ })
/******/ ]);