class ToggleInfo extends HTMLElement {
    constructor() {
        super();

        this.button = this.querySelector('button');
        this.contentWrapper = this.querySelector('.toggle-info__content-wrapper');

        this.button.addEventListener('click', this.toggleContent.bind(this));
    }

    toggleContent() {
        this.classList.toggle('toggle-info--active');
    }
}

if (!customElements.get('toggle-info')) {
    customElements.define('toggle-info', ToggleInfo);
}
