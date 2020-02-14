/** Loading screen */

class Loading {
  constructor() {
    this.el = {};
    this.el.loadingScreen = document.querySelector('.loading');
    this.hide();
  }

  show(state) {
    this.el.loadingScreen.classList.add('active');
  }

  hide() {
    this.el.loadingScreen.classList.remove('active');
  }
}

export default Loading;
