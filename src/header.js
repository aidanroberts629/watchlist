class Header extends HTMLElement {
    constructor() {
        super();
    }

    // the whole point for this web component currently is just to link bulma
    connectedCallback() {
        this.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
      `;
    }
}

customElements.define('header-component', Header);