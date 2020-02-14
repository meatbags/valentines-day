/** Camera */

class Camera {
  constructor(root) {
    this.offset = 0.1;
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.rotation.order = 'YXZ';
    this.camera.position.set(5, 0, 5);
    this.target = new THREE.Vector3(0, 0, 0);
    this.age = 0;
  }

  bind(root) {
    this.ref = {};

    // resize camera
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  resize() {
    const x = window.innerWidth;
    const y = window.innerHeight;
    this.camera.aspect = x / y;
    this.camera.updateProjectionMatrix();
  }

  update(delta) {
    this.age += delta;
    const t = this.age * 0.25;
    this.camera.position.y = 5 + Math.sin(t) * 1;
    this.camera.lookAt(this.target);
  }
}

export default Camera;
