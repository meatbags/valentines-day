/** Alert */

import CreateElement from '../util/create_element';

class Alert {
  constructor(params) {
    this.msg = params.msg;
    this.x = params.position.x;
    this.y = params.position.y;
    this.keepAlive = params.keepAlive === undefined ? false : params.keepAlive;
    this.render();
  }

  remove() {
    this.el.classList.remove('active');
    setTimeout(() => {
      this.el.parentNode.removeChild(this.el);
    }, 500);
  }

  render() {
    this.el = CreateElement({
      classList: 'alert',
      innerHTML: this.msg,
      style: {
        top: `${this.y}px`,
        left: `${this.x}px`,
      },
    });

    // remove other alerts
    const top = `${this.y}px`;
    document.querySelectorAll('.alert').forEach(el => {
      if (el.style.top == top) {
        el.classList.remove('active');
      }
    });

    // add to doc
    document.querySelector('body').appendChild(this.el);

    // fade in
    setTimeout(() => {
      this.el.classList.add('active');
      if (!this.keepAlive) {
        setTimeout(() => {
          this.remove();
        }, 2000);
      }
    }, 20);
  }
}

export default Alert;
