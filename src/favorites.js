import * as storage from "./localStorage.js";
import "./resultcard.js";

let status = document.querySelector("#element-status");

const showFavorites = () => {
    // grab the array of favorites from localStorage and 
    // update `listFavorites`
    let favorites = storage.getFavorites();
    console.log(storage.getFavorites());

    if (favorites.length > 0)
        status.innerHTML = "Here are your favorites";

    for (let i = 0; i < favorites.length; i++) {
        let result = favorites[i];
        console.log("Result: " + result);
        let title = result.title;
        let date = result.date;
        let src = "https://image.tmdb.org/t/p/w300/" + result.src;

        let newCard = document.createElement("result-card");
        newCard.dataset.itemNum = i + 1;
        newCard.dataset.title = title;
        newCard.dataset.date = date;
        newCard.dataset.src = src;
        newCard.btnFavorite.style.display = "none"; //removes button from card web component
        let elementCardHolder = document.querySelector("#element-card-holder");
        elementCardHolder.appendChild(newCard); //update cards
    }
};
const init = () => {
    showFavorites();
    document.querySelector("#btn-clear-favorites").onclick = () => {
        // get this button working
        storage.clearFavorites();

        let elementCardHolder = document.querySelector("#element-card-holder");
        elementCardHolder.innerHTML = "";
        status.innerHTML = "No favorites yet";
    };

    window.onstorage = () => {
        showFavorites();
    };
}

init();