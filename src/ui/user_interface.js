/** User interface */

import Alert from './alert';

class UserInterface {
  constructor() {
    this.active = document.querySelector('.overlay').classList.contains('editable');
    console.log('[UserInterface] ' + (this.active ? 'Editable' : 'Not editable'));
  }

  bind(root) {
    // get refs
    this.ref = {};
    this.ref.scene = root.modules.scene;

    // elements
    this.el = {};
    this.el.message = document.querySelector('#card-message');
    this.el.controls = document.querySelector('.overlay__controls');
    this.el.input = {};
    this.el.input.token = document.querySelector('input[name="token"]');
    this.el.input.text = document.querySelector('textarea[name="text"]');
    this.el.input.colourBackground = document.querySelector('input[name="colour_background"]');
    this.el.input.colourText = document.querySelector('input[name="colour_text"]');
    this.el.input.colourPetals = document.querySelector('input[name="colour_petals"]');
    this.el.input.colourStem = document.querySelector('input[name="colour_stem"]');
    this.el.button = {};
    this.el.button.copyUrl = document.querySelector('#button-copy-url');
    this.el.button.mobile = document.querySelector('#button-mobile');
    this.el.target = {};
    this.el.target.colourBackground = document.querySelector('#app-target');
    this.el.target.colourText = document.querySelector('#card-message');
    this.el.target.url = document.querySelector('#url-target');

    // set initial colours
    this.setColours();

    // inputs
    if (this.active) {
      this.el.input.text.addEventListener('keydown', () => { setTimeout(() => { this.setMessage(); }, 50); }, true);

      // auto-save events
      this.el.input.text.addEventListener('change', () => { this.setMessage(); this.save(); });
      this.el.input.colourBackground.addEventListener('change', () => { this.setColours(); this.save(); });
      this.el.input.colourText.addEventListener('change', () => { this.setColours(); this.save(); });
      this.el.input.colourPetals.addEventListener('change', () => { this.setColours(); this.save(); });
      this.el.input.colourStem.addEventListener('change', () => { this.setColours(); this.save(); });

      // buttons
      this.el.button.mobile.addEventListener('click', () => {
        this.el.button.mobile.classList.toggle('mobile-active');
        this.el.controls.classList.toggle('mobile-active');
      });
      this.el.button.copyUrl.addEventListener('click', () => { this.copyLinkToClipboard(); });

      // initial save
      this.save();
    }
  }

  validateColourHex(colour) {
    const hex = '0x' + colour.substring(1, colour.length);
    const validLength = colour.length == 7 || colour.length == 4;
    const valid = validLength && colour.indexOf('#') === 0 && !isNaN(parseInt(hex));
    return valid ? colour : false;
  }

  getThreeHex(colour) {
    let hex = colour.substring(1, colour.length);
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return parseInt('0x' + hex);
  }

  getMessage() {
    return this.el.input.text.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  setMessage() {
    this.el.message.innerHTML = this.getMessage();
  }

  setColours() {
    const background = this.validateColourHex(this.el.input.colourBackground.value);
    const text = this.validateColourHex(this.el.input.colourText.value);
    const petals = this.validateColourHex(this.el.input.colourPetals.value);
    const stem = this.validateColourHex(this.el.input.colourStem.value);

    // background
    if (background) {
      this.el.target.colourBackground.style.background = background;
    } else {
      this.inputAlert(this.el.input.colourBackground, {msg: 'Invalid hex code'});
    }

    // text
    if (text) {
      this.el.target.colourText.style.color = text;
      if (background) {
        this.el.target.colourText.style.textShadow = `1px 1px ${background}`;
      }
    } else {
      this.inputAlert(this.el.input.colourText, {msg: 'Invalid hex code'});
    }

    // petals
    if (petals) {
      if (this.ref.scene.petals) {
        const hex = this.getThreeHex(petals);
        this.ref.scene.petals.material.color.setHex(hex);
      }
    } else {
      this.inputAlert(this.el.input.colourPetals, {msg: 'Invalid hex code'});
    }

    // stem
    if (stem) {
      if (this.ref.scene.stem) {
        const hex = this.getThreeHex(stem);
        this.ref.scene.stem.material.color.setHex(hex);
      }
    } else {
      this.inputAlert(this.el.input.stem, {msg: 'Invalid hex code'});
    }
  }

  inputAlert(el, params) {
    const rect = el.getBoundingClientRect();
    const alert = new Alert({
      position: {
        x: rect.left + rect.width + 8,
        y: rect.top + rect.height / 2,
      },
      ...params,
    });
    return alert;
  }

  deferredSave() {
    if (this.active) {
      if (this.saveTimeout) {
        clearTimeout(this.saveTimeout);
      }
      this.saveTimeout = setTimeout(() => {
        this.save();
        this.saveTimeout = false;
      }, 1000);
    }
  }

  save() {
    if (this.active) {
      const token = this.el.input.token.value;
      const text = this.getMessage();
      const colourBackground = this.validateColourHex(this.el.input.colourBackground.value);
      const colourText = this.validateColourHex(this.el.input.colourText.value);
      const colourPetals = this.validateColourHex(this.el.input.colourPetals.value);
      const colourStem = this.validateColourHex(this.el.input.colourStem.value);

      // invalid colours
      if (!(colourBackground && colourText && colourPetals && colourStem)) {
        return;
      }

      // create form
      const formData = new FormData();
      formData.append('token', token);
      formData.append('text', text);
      formData.append('colour_background', colourBackground);
      formData.append('colour_text', colourText);
      formData.append('colour_petals', colourPetals);
      formData.append('colour_stem', colourStem);

      // save
      const savingAlert = this.inputAlert(this.el.button.copyUrl, {msg: 'Saving card...', keepAlive: true});
      setTimeout(() => {
        fetch('inc/save-card.php', {method: 'POST',  body: formData})
          .then(res => res.json())
          .then(json => {
            savingAlert.remove();
            this.inputAlert(this.el.button.copyUrl, {msg: 'Saved'});
          });
        },
      350);
    }
  }

  copyLinkToClipboard() {
    const el = document.createElement('textarea');
    const url = this.el.target.url.innerText;
    console.log('URL:', url);
    //el.style.display = 'none';
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.inputAlert(this.el.button.copyUrl, {msg: 'Link copied to clipboard'});
  }
}

export default UserInterface;
