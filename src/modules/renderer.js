/** Renderer */

import '../glsl';

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.renderer.setClearColor(0x0, 0.1);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = 2.125;
    this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap;

    // add to doc
    this.domTarget = document.querySelector('#canvas-target');
    this.domTarget.appendChild(this.renderer.domElement);
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene.scene;
    this.ref.camera = root.modules.camera.camera;

    // disable composer
    this.useComposer = false;
    this.size = new THREE.Vector2();

    // composer + render passes
    this.composer = new THREE.EffectComposer(this.renderer);
    const strength = 0.8;
    const radius = 0.25;
    const threshold = 0.95;
    this.passes = {
      render: new THREE.RenderPass(this.ref.scene, this.ref.camera),
      bloom: new THREE.BloomLite(this.size, strength, radius, threshold),
    };
    Object.keys(this.passes).forEach(key => {
      this.composer.addPass(this.passes[key]);
    });

    // set render pass
    this.passes.bloom.renderToScreen = true;

    // bind events
    this.resize();
    window.addEventListener('resize', () => { this.resize(); });
  }

  reset() {
    this.useComposer = false;
  }

  resize() {
    const x = window.innerWidth;
    const y = window.innerHeight;
    this.size.set(x, y);
    this.renderer.setSize(x, y);
    this.composer.setSize(x, y);
    Object.keys(this.passes).forEach(key => {
      if (this.passes[key].setSize) {
        this.passes[key].setSize(x, y);
      }
    });
  }

  render(delta) {
    if (this.useComposer) {
      this.composer.render(delta);
    } else {
      this.renderer.render(this.ref.scene, this.ref.camera);
    }
  }
}

export default Renderer;
