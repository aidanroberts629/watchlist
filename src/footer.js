class Footer extends HTMLElement {
    constructor() {
        super();
    }

    // the point of this web component is for a nicely formatted footer, similar to an imagined mirror image of the current navbar
    connectedCallback() {
        this.innerHTML = `
        <style>
          footer {
            height: 50px;
            padding: 0 10px;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #0d253f;
          }
          
          ul li {
            list-style: none;
            display: inline;
          }
          
          a {
            margin: 0 20px;
            color: white;
            text-decoration: none;
          }
          
          .socials {
            font-size: 20px;
          }
          
          .socials li a {
            margin: 0 10px;
          }
        </style>
        <footer>
          <ul>
            <li><a href="mailto:ar8179@rit.edu" target="_blank" rel="noopener noreferrer">Contact</a></li>
            <li><a href="https://aidanroberts.dev/" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
          </ul>
          <ul class="socials">
            <li><a href="https://www.linkedin.com/in/aidan-roberts/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="https://github.com/aidanroberts629/" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a></li>
          </ul>
        </footer>
      `;
    }
}

customElements.define('footer-component', Footer);