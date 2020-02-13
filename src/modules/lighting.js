/** Lighting */

import IsMobileDevice from '../util/is_mobile_device';

class Lighting {
  constructor() {
    this.lightingModel = IsMobileDevice() ? 1 : 2;

    // lights
    this.lights = {point: {}, ambient: {}, directional: {}, hemisphere: {}, spot: {}};
    this.lights.point.a = new THREE.PointLight(0xffffff, 1, 24, this.lightingModel);
    this.lights.ambient.a = new THREE.AmbientLight(0xffffff, 0.3);
    this.lights.directional.a = new THREE.DirectionalLight(0xffffff, 0.5);
    this.lights.hemisphere.a = new THREE.HemisphereLight(0x0, 0x0000ff, 0.25);
    this.lights.spot.a = new THREE.SpotLight(0xffffff, 1, 32, Math.PI / 3, 0.25);
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene.scene;
    this.ref.materials = root.modules.materials;
    this.init();
  }

  init(data) {
    // default callback
    this.updateCallback = null;

    // default positions
    this.lights.point.a.position.set(0, 10, 0);
    this.lights.directional.a.position.set(-1, 1.5, -1);
    this.lights.spot.a.position.set(0, 10, 14);
    this.lights.spot.a.target.position.set(-4, 0, 6);

    // default intensity
    this.lights.point.a.intensity = 1;
    this.lights.ambient.a.intensity = 0.3;
    this.lights.directional.a.intensity = 0.5;
    this.lights.hemisphere.a.intensity = 0.25;
    this.lights.spot.a.intensity = 1;

    // default colour
    this.lights.point.a.color.setHex(0xffffff);
    this.lights.ambient.a.color.setHex(0xffffff);
    this.lights.spot.a.color.setHex(0xffffff);

    // misc
    this.lights.point.a.distance = 32;
    this.lights.spot.a.distance = 32;
    this.lights.spot.a.angle = Math.PI / 3;
    this.lights.spot.a.penumbra = 0.25;

    // add lights
    Object.keys(this.lights).forEach(type => {
      Object.keys(this.lights[type]).forEach(key => {
        const light = this.lights[type][key];
        this.ref.scene.add(light);
        if (light.isSpotLight) {
          this.ref.scene.add(light.target);
        }
      });
    });

    // remove fog
    this.ref.scene.fog = new THREE.FogExp2(0x000000, 0);
  }
}

export default Lighting;
