/** Scene */

import Loader from '../loader/loader';

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.loader = new Loader('assets');
    this.group = new THREE.Group();
    this.scene.add(this.group);
  }

  bind(root) {
    this.ref = {};
    this.ref.userInterface = root.modules.userInterface;
    this.loader.loadFBX('rose').then(obj => {
      this.rose = obj;
      this.petals = obj.children[1];
      this.stem = obj.children[0];
      this.group.add(obj);
      this.ref.userInterface.setColours();
    });
  }

  update(delta) {
    const rps = 1 / 32;
    this.group.rotation.y += Math.PI * 2 * rps * delta;
  }
}

export default Scene;
