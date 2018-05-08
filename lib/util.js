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
