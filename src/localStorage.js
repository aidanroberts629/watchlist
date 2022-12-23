const defaultData = {
        "appTitle": "Default App Title",
        "favorites": []
    },
    key = "ar8179-p1-settings"; // TODO: change to your id


const readLocalStorage = () => {
    let allValues = null;

    try {
        allValues = JSON.parse(localStorage.getItem(key)) || defaultData;
    } catch (err) {
        console.log(`Problem with JSON.parse() and ${key} !`);
        throw err;
    }

    return allValues;
};

const writeLocalStorage = (allValues) => {
    localStorage.setItem(key, JSON.stringify(allValues));
};

export const clearLocalStorage = () => writeLocalStorage(defaultData);

export const addFavorite = (str) => {
    const allValues = readLocalStorage();

    allValues.favorites.push(str);
    writeLocalStorage(allValues);
};

export const getFavorites = () => readLocalStorage().favorites;

export const clearFavorites = () => {
    const allValues = readLocalStorage();

    allValues.favorites = [];
    writeLocalStorage(allValues);
};

export const setSearchTerm = (str) => {
    localStorage.setItem("searchTerm", str);
};

export const getSearchTerm = () => localStorage.getItem("searchTerm");