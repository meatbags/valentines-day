/** App entry & main loop */

// modules
import Camera from './modules/camera';
import Lighting from './modules/lighting';
import Loading from './ui/loading';
import Loop from './modules/loop';
import Materials from './modules/materials';
import Renderer from './modules/renderer';
import Scene from './modules/scene';

class App {
  constructor() {
    this.modules = {
      camera: new Camera(),
      lighting: new Lighting(),
      loading: new Loading(),
      loop: new Loop(),
      materials: new Materials(),
      renderer: new Renderer(),
      scene: new Scene(),
    };

    // bind modules
    Object.keys(this.modules).forEach(key => {
      if (this.modules[key].bind) {
        this.modules[key].bind(this);
      }
    });

    // start
    this.target = null;
    this.modules.loading.hide();
  }

  resize() {
    // bind modules
    Object.keys(this.modules).forEach(key => {
      if (this.modules[key].resize) {
        this.modules[key].resize();
      }
    });
  }
}

window.onload = () => {
  const app = new App();
};
