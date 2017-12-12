(function() {
  "use strict";
})();

let active = null;

function Animated(world) {
  this.world = world;
  this.button = document.getElementById('controlButton');
  this.pre = document.getElementById('electronicWorld');

  let self = this;  //TO-DO: Arrow-function

  this.button.addEventListener("click", function() { self.clicked(); });
  this.disabled = false;

  // if (active) {
  //   active.disable();
  // }
  active = this;
  this.interval = setInterval(function() { self.tick(); }, 500);
}

Animated.prototype.clicked = function() {
  if (this.disabled) return;
  if (this.interval) {
    clearInterval(this.interval);

    this.interval = null;
    this.button.innerHTML = "start";
  } else {
    let self = this;

    this.interval = setInterval(function() { self.tick(); }, 500);
    this.button.innerHTML = "stop";
  }
};

Animated.prototype.tick = function() {
  this.world.turn();

  electronicWorld.innerHTML = this.world.toString();
  worldIteration.innerHTML++;
};

// Animated.prototype.disable = function() {
//   this.disabled = true;

//   clearInterval(this.interval);

//   this.button.innerHTML = "Disabled";
//   this.button.style.color = "red";
// };

window.animateWorld = function(world) {
  new Animated(world);
};
// })();
