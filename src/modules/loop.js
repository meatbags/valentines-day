/** the main loop */

class Loop {
  constructor() {
    this.active = false;
    this.deltaMax = 0.1;
  }

  bind(root) {
    this.ref = {};
    this.ref.update = [];
    this.ref.render = [];

    // modules for update & render
    Object.keys(root.modules).forEach(key => {
      if (root.modules[key].update) {
        this.ref.update.push(root.modules[key]);
      }
      if (root.modules[key].render) {
        this.ref.render.push(root.modules[key]);
      }
    });

    // doc targets
    this.el = {};
    this.el.wrapper = document.querySelector('.wrapper');
    this.el.canvasWrapper = document.querySelector('.canvas-wrapper');
    this.now = performance.now();
    this.loop();
  }

  pause() {
    this.active = false;
  }

  hide() {
    this.pause();
    this.el.wrapper.classList.remove('docked');
    this.el.canvasWrapper.classList.remove('active');  }

  resume() {
    this.el.wrapper.classList.add('docked');
    this.el.canvasWrapper.classList.add('active');
    this.now = performance.now();
    this.active = true;
  }

  loop() {
    requestAnimationFrame(() => {
      this.loop();
    });

    if (this.active) {
      const now = performance.now();
      const delta = Math.min(this.deltaMax, (now - this.now) / 1000);
      this.now = now;
      this.ref.update.forEach(mod => { mod.update(delta); });
      this.ref.render.forEach(mod => { mod.render(delta); });
    }
  }
}

export default Loop;
