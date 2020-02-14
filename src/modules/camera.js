/** Camera */

class Camera {
  constructor(root) {
    this.offset = 0.1;
    this.camera = new THREE.PerspectiveCamera(65, 1, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.rotation.order = 'YXZ';
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(new THREE.Vector3());
  }

  bind(root) {
    this.ref = {};

    // resize camera
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  set(params) {
    this.camera.fov = params.fov || 65;
    this.camera.updateProjectionMatrix();
  }

  addAudioListener() {
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
  }

  resize() {
    const x = window.innerWidth;
    const y = window.innerHeight;
    this.camera.aspect = x / y;
    this.camera.updateProjectionMatrix();
  }

  update(delta) {}
}

export default Camera;
