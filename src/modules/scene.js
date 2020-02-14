/** Scene */

import Loader from '../loader/loader';

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.loader = new Loader('assets');
    this.loader.loadFBX('rose').then(obj => {
      console.log(obj);
    });
  }

  bind(root) {
    this.ref = {};
  }

  update(delta) {

  }
}

export default Scene;
