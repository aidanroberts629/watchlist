const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
.result, .card-content, #image-main{
    display: flex;
    flex-direction: column;
    background-color: #C9D6EA;
    box-shadow: 0 25px 20px 0px rgba(0, 0, 0, .4);
    color: rgb(21, 21, 80);
    text-align: center;
}
#btn-favorite {
    width: 75%;
    margin: auto;
}
#title {
    padding: 2px;
}
</style>

<div class='result'>
<h1><i id="item-num"></i></h1>
<b>Title:</b>
    <span id="title">???</span>
<b>Release Date:</b>
    <span id="date">???</span>
<button id="btn-favorite" class="button is-info" title="Add to Favorites!">Favorite!</button>
</div>

<div class="card-content">
    <div class="card-image">
        <figure class="image">
            <img id="image-main" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>
    </div>
</div>
`;

class ResultsCard extends HTMLElement {
    static defaultImage = "https://via.placeholder.com/300x450";

    constructor() {
        super();
        this.attachShadow({ "mode": "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.btnFavorite = this.shadowRoot.querySelector("#btn-favorite");
    }

    connectedCallback() {
        this.shadowRoot.querySelector("#item-num").innerHTML = this.dataset.itemNum;
        this.shadowRoot.querySelector("#title").innerHTML = this.dataset.title;
        this.shadowRoot.querySelector("#date").innerHTML = this.dataset.date;

        this.shadowRoot.querySelector("#image-main").src = this.dataset.src || ResultsCard.defaultImage;

        // favorites

        this.callback = this.callback || ((obj) => console.log(`Title: ${obj.title}, Date:${obj.date}`));

        // card functionality
        this.btnFavorite.onclick = (evt) => {
            const dataObj = {
                "itemNum": this.dataset.itemNum,
                "title": this.dataset.title,
                "date": this.dataset.date,
                "src": this.dataset.src
            };
            // changes visual state of button when clicked
            this.btnFavorite.style.backgroundColor = "green";
            this.btnFavorite.innerHTML = "Favorited!";

            this.callback(dataObj);
        };

    }

    disconnectedCallback() {
        this.btnFavorite.onclick = null;
    }
}

customElements.define("result-card", ResultsCard);