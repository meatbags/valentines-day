/** Load FBX & OBJ */

import './FBXLoader';
import './OBJLoader';

class Loader {
  constructor(path) {
    this.path = `${APP_ROOT}/${path}/`;
    this.materials = {};
    this.images = {};
    this.loaderFBX = new THREE.FBXLoader();
    this.loaderOBJ = new THREE.OBJLoader();
    this.loaderTexture = new THREE.TextureLoader();
    this.loaderFont = new THREE.FontLoader();
  }

  loadFBX(file) {
    return new Promise(
      (resolve, reject) => {
        try {
          const path = this.path + file + (file.indexOf('.fbx') == -1 ? '.fbx' : '');
          this.loaderFBX.load(path, (model) => { resolve(model); });
        } catch(error) {
          console.log(error);
          reject(error);
        }
      }
    );
  }

  loadOBJ(file) {
    return new Promise(
      (resolve, reject) => {
        try {
          this.loaderOBJ.load(this.path + file + '.obj', (model) => { resolve(model); });
        } catch(error) {
          console.log(error);
          reject(error);
        }
      }
    )
  }

  loadFont(file) {
    return new Promise(
      (resolve, reject) => {
        try {
          this.loaderFont.load(this.path + file, font => {
            resolve(font);
          });
        } catch(error) {
          console.log(error);
          reject(error);
        }
      }
    )
  }

  loadTexture(file) {
    return this.loaderTexture.load(this.path + file);
  }
}

export default Loader;
