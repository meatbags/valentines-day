/** Loading screen */

class Loading {
  constructor() {
    this.el = {};
    this.el.doc = document.documentElement;
    this.el.html = document.querySelector('html');
    this.el.loadingScreen = document.querySelector('.loading-screen');
    this.el.loadingIcon = document.querySelector('.loading-icon');
    this.state = parseInt(this.el.loadingScreen.dataset.state);
    this.nextState = 0;
  }

  show(state) {
    return new Promise((resolve, reject) => {
      if (this.state == 1) {
        resolve();
      } else {
        this.nextState = state === undefined ? (this.state == 0 ? 2 : 0) : state;
        this.state = 1;
        this.el.loadingScreen.dataset.state = this.state;
        this.el.loadingIcon.classList.add('active');
        setTimeout(() => {
          if (this.nextState == 2 && !this.el.html.classList.contains('freeze')) {
            this.scrollTo = (window.pageYOffset || this.el.doc.scrollTop) - (this.el.doc.clientTop || 0);
            this.el.html.classList.add('freeze');
          }
          resolve();
        }, 500);
      }
    });
  }

  hide() {
    if (this.state == 1) {
      this.state = this.nextState;
      if (this.state == 0) {
        this.el.html.classList.remove('freeze');
      }
      setTimeout(() => {
        window.scrollTo(0, this.scrollTo);
        this.el.loadingScreen.dataset.state = this.state;
        this.el.loadingIcon.classList.remove('active');
      }, 200);
    }
  }
}

export default Loading;
