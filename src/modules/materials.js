/** Material handler */

class Materials {
  constructor() {
    this.path = `${APP_ROOT}`;

    // set default materials
    this.mat = {};
    this.mat.default = new THREE.MeshPhysicalMaterial({emissive: 0, roughness: 1, envMapIntensity: 0.25});
    this.mat.porcelain = new THREE.MeshPhysicalMaterial({color: 0x444444, emissive: 0x888888, emissiveIntensity: 0.6, roughness: 0.55, metalness: 0.125, envMapIntensity: 0.5});
    this.mat.metal = new THREE.MeshPhysicalMaterial({color: 0xa88e79, emissive: 0x0, roughness: 0.25, metalness: 1.0, envMapIntensity: 0.5});
    this.mat.neon = new THREE.MeshPhysicalMaterial({emissive: 0xffffff, emissiveIntensity: 1.0});

    // apply default envmap
    this.envMap = this.createEnvMap('assets/envmap');
    this.envMapIntensity = 0.5;
    Object.keys(this.mat).forEach(key => {
      if (this.mat[key].type && this.mat[key].type === 'MeshPhysicalMaterial') {
        this.mat[key].envMap = this.envMap;
      }
    });

    // shader uniforms
    this.uniforms = {time: {value: 0}};
  }

  bind(root) {}

  createEnvMap(path) {
    const sources = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'].map(filename => `${this.path}${path}/${filename}.jpg`);
    const map = new THREE.CubeTextureLoader().load(sources);
    return map;
  }

  conformGroup(obj) {
    // recursively conform object groups
    if (obj.type === 'Mesh') {
      this.conformMaterial(obj.material);
    } else if (obj.children && obj.children.length) {
      obj.children.forEach(child => {
        this.conformGroup(child);
      });
    }
  }

  conformMaterial(mat) {
    if (!this.loaded[mat.name]) {
      this.loaded[mat.name] = mat;
    }

    // apply env map
    mat.envMap = this.envMap;
    mat.envMapIntensity = this.envMapIntensity;
  }

  createCustomMaterial(material, shaderText, funcs) {
    const mat = material.clone();
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = `uniform float time;\n${funcs || ''}\n${shader.vertexShader}`;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', shaderText);
      shader.uniforms.time = this.uniforms.time;
    };
    return mat;
  }

  applyAlphaMap(material, map) {
    material.color.setHex(0xffffff);
    material.alphaMap = map;
    material.transparent = true;
    material.side = THREE.DoubleSide;
    material.depthWrite = false;
    // material.blending = THREE.AdditiveBlending;
  }

  update(delta) {
    this.uniforms.time.value += delta;
  }
}

export default Materials;
