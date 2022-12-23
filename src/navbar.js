const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer"
/>
<style>
.navbar-menu,
.navbar-item,
.navbar-brand {
    background-color: #0d253f;
}
</style>

<nav class="navbar has-shadow is-white">
        <div class="navbar-brand">
            <a class="navbar-item" href="index.html">
                <i class="fas fa-solid fa-film"></i>
            </a>
            <a class="navbar-burger" id="burger">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>

        <div class="navbar-menu" id="nav-links">
            <div class="navbar-start">
                <a class="navbar-item has-text-white" href="index.html">
                    Home
                </a>

                <a class="navbar-item is-hoverable has-text-white" href="app.html">
                    App
                </a>

                <a class="navbar-item is-hoverable has-text-white" href="favorites.html">
                    Favorites
                </a>

                <a class="navbar-item is-hoverable has-text-white" href="documentation.html">
                    Documentation
                </a>
            </div>
            <div class="navbar-end">
                <span class="navbar-item">
                    <img src="images/logo.png">
                </span>
            </div>
            <!-- end navbar-start -->
        </div>
    </nav>
`;

class Navbar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ "mode": "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.burgerIcon = this.shadowRoot.querySelector("#burger");
        this.navbarMenu = this.shadowRoot.querySelector("#nav-links");

    }
    connectedCallback() {
        // burger menu functionality
        this.burgerIcon.addEventListener('click', () => {
            this.navbarMenu.classList.toggle('is-active');
        })
    }
}

customElements.define("app-navbar", Navbar);