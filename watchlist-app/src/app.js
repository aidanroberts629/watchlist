import * as storage from "./localStorage.js";
import "./resultcard.js";

document.querySelector("#btn-search").onclick = filterFetchJson;
document.querySelector("#btn-clear-all").onclick = clearData;
document.querySelector("#btn-clear-all-2").onclick = clearData;
document.querySelector("#btn-next-page").onclick = filterNextPage;
document.querySelector("#btn-prev-page").onclick = filterPrevPage;
document.querySelector("#btn-input-search").onclick = inputFetchJson;
document.querySelector("#search-btn-next-page").onclick = serachNextPage;
document.querySelector("#search-btn-prev-page").onclick = searchPrevPage;

let pageNum = 1;
let mediaValue = document.querySelector("#field-media").value;
let resultMedia = "";
let resultType = "";

const GIPHY_KEY = "35f61299d51396850e295a5ff11e73a0";

document.querySelector("#input-search").value = storage.getSearchTerm(); //retrieves stored search term value

function filterFetchJson() {
    let GIPHY_URL = "https://api.themoviedb.org/3/"; //start of building the endpoint url

    // media type for url
    mediaValue = document.querySelector("#field-media").value;
    if (mediaValue == "Movies") {
        GIPHY_URL += "movie/";
        resultMedia = "Movies";
    } else {
        GIPHY_URL += "tv/";
        resultMedia = "TV Shows";
    }

    // filter type for url
    let filterValue = document.querySelector("#field-filter-by").value;

    if (filterValue == "Popular") {
        GIPHY_URL += "popular?";
        resultType = "Popular";
    } else {
        GIPHY_URL += "top_rated?";
        resultType = "Top Rated";
    }

    // api key for url
    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    url += "&language=en-US"; //MovieDB API (with my auth key)

    // page num
    //pageNum = 1; //resetting page num, as this is the "default" page
    url += "&page=" + pageNum;

    // json request / card creation
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            clearData();
            // communicating search type to user
            let resultMessage = `<b>Results for '${resultType} ${resultMedia}'</b>`;
            document.querySelector("#element-status").innerHTML = resultMessage; //update ui

            let obj = json;
            console.log(obj);

            // putting info on cards
            if (mediaValue == "Movies") //if movies
            {
                for (let i = 0; i < 20; i++) {
                    let result = obj.results[i];

                    let itemNum = (i + 1) + ((pageNum - 1) * 20);
                    let title = result.title;
                    let releaseDate = result.release_date;
                    let imageURL = "https://image.tmdb.org/t/p/w300/" + result.poster_path;

                    let newCard = document.createElement("result-card");
                    newCard.dataset.itemNum = itemNum;
                    newCard.dataset.title = title;
                    newCard.dataset.date = releaseDate;
                    newCard.dataset.src = imageURL;

                    newCard.callback = addToFavorites; // change the card's callback to point at `addToFavorites()`

                    let elementCardHolder = document.querySelector("#element-card-holder");
                    elementCardHolder.appendChild(newCard); //update cards
                }
            } else //if tv
            {
                for (let i = 0; i < 20; i++) {
                    let result = obj.results[i];

                    let itemNum = (i + 1) + ((pageNum - 1) * 20);
                    let name = result.name;
                    let airDate = result.first_air_date;
                    let imageURL = "https://image.tmdb.org/t/p/w300/" + result.poster_path;

                    let newCard = document.createElement("result-card");
                    newCard.dataset.itemNum = itemNum;
                    newCard.dataset.title = name;
                    newCard.dataset.date = airDate;
                    newCard.dataset.src = imageURL;
                    newCard.callback = addToFavorites; // change the card's callback to point at `addToFavorites()`

                    let elementCardHolder = document.querySelector("#element-card-holder");
                    elementCardHolder.appendChild(newCard); //update cards
                }
            }
        })
        .catch(console.error)
}

function inputFetchJson() {
    // url building
    let GIPHY_URL = "https://api.themoviedb.org/3/search/multi?"; //start of building the endpoint url


    // api key for url
    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    url += "&language=en-US"; //MovieDB API (with my auth key)

    // input search term
    let searchValue = document.querySelector("#input-search").value;
    storage.setSearchTerm(searchValue); //stores search term value

    console.log("search value: " + searchValue);
    url += "&query=" + searchValue;

    // page num
    //pageNum = 1; //resetting page num, as this is the "default" page
    url += "&page=" + pageNum;

    // json request / card creation
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            clearData();
            // communicating search type to user
            let resultMessage = "";
            if (document.querySelector("#input-search").value == "") //if no search term
                resultMessage = `<b>Please enter a search term before searching!</b>`;
            else
                resultMessage = `<b>Results for '${document.querySelector("#input-search").value}'</b>`;
            document.querySelector("#element-status").innerHTML = resultMessage; //update ui

            let obj = json;
            console.log(obj);

            // putting info on cards
            for (let i = 0; i < 20; i++) {
                let result = obj.results[i];

                if (result.media_type == "movie") { //movie
                    let itemNum = (i + 1) + ((pageNum - 1) * 20);
                    let title = result.title;
                    let releaseDate = result.release_date;
                    let imageURL = "https://image.tmdb.org/t/p/w300/" + result.poster_path;

                    let newCard = document.createElement("result-card");
                    newCard.dataset.itemNum = itemNum;
                    newCard.dataset.title = title;
                    newCard.dataset.date = releaseDate;
                    newCard.dataset.src = imageURL;
                    newCard.callback = addToFavorites; // change the card's callback to point at `addToFavorites()`

                    let elementCardHolder = document.querySelector("#element-card-holder");
                    elementCardHolder.appendChild(newCard); //update cards
                } else { //tv
                    let itemNum = (i + 1) + ((pageNum - 1) * 20);
                    let name = result.name;
                    let airDate = result.first_air_date;
                    let imageURL = "https://image.tmdb.org/t/p/w300/" + result.poster_path;

                    let newCard = document.createElement("result-card");
                    newCard.dataset.itemNum = itemNum;
                    newCard.dataset.title = name;
                    newCard.dataset.date = airDate;
                    newCard.dataset.src = imageURL;
                    newCard.callback = addToFavorites; // change the card's callback to point at `addToFavorites()`

                    let elementCardHolder = document.querySelector("#element-card-holder");
                    elementCardHolder.appendChild(newCard); //update cards
                }
            }
        })
        .catch(console.error)
}

const addToFavorites = (mediaObj) => {
    console.log("mediaObj=", mediaObj);

    favoriteMedia(mediaObj);
};

//---------------------------------------------------------------------------------------------------------------------------------------------

function clearData() {
    document.querySelector("#element-card-holder").innerHTML = "";
    document.querySelector("#element-status").innerHTML = "<b>Cleared search results!</b>"; //update ui
}

function filterNextPage() {
    pageNum++;
    filterFetchJson();
}

function filterPrevPage() {
    if (pageNum > 1)
        pageNum--;
    filterFetchJson();
}

function serachNextPage() {
    pageNum++;
    inputFetchJson();
}

function searchPrevPage() {
    if (pageNum > 1)
        pageNum--;
    inputFetchJson();
}

function favoriteMedia(title) {
    const newFavorite = title;

    if (newFavorite) {
        storage.addFavorite(newFavorite);
    }
}

// functionality for hitting "enter" instead of clicking button
let inputField = document.querySelector("#input-search");

inputField.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector("#btn-input-search").click();
  }
});