(function() {
  "use strict";
})();

let active = null; 

class Animated {
  constructor(world) {
    this.world = world;
    this.button = document.getElementById('controlButton');
    this.pre = document.getElementById('electronicWorld');

    this.button.addEventListener("click", () => { this.clicked(); });
    //this.disabled = false;

    //active = this;
    //this.interval = setInterval(function() { self.tick(); }, 500);
    this.interval = setInterval(() => { this.tick(); }, 500);
  }

  clicked() {
    //if (this.disabled) return;
    if (this.interval) {
      clearInterval(this.interval);

      this.interval = null;
      this.button.innerHTML = "start";
    } else {
      this.interval = setInterval(() => { this.tick(); }, 500);
      this.button.innerHTML = "stop";
    }
  }

  tick() {
    this.world.turn();

    electronicWorld.innerHTML = this.world.toString();
    worldIteration.innerHTML++;
  }
}

window.animateWorld = function(world) {
  new Animated(world);
};
