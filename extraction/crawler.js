// This file has functions for crawling the reviews page of any Steam Game
// This script is meant to be pasted on your browser's Javascript Console
// The localStorage is widely used here because it keeps consistent among every page of a domain

// Getting information about the game from the page
var gameUid = window.location.href.split("app/")[1].split("/")[0];
var gameName = document.getElementsByClassName("apphub_AppName")[0].innerText;

// This variable is meant to be an object based on the json saved on localStorage.steamguess
// It can later be saved as json to the localStorage with the updateLocalStorage() function
var db = JSON.parse(localStorage.steamguess) || {
    reviews: [],
    games: []
};

// Detects URL and properly redirects to the reviews page so it can access the proper localStorage instance
if (window.location.href.indexOf("http://steamcommunity.com/app/" + gameUid + "/reviews/?browsefilter=toprated") < 0) {
    if (confirm("This doesn't look like the reviews page! Do you want to go to the reviews page?")) {
        window.location.href = "http://steamcommunity.com/app/" + gameUid + "/reviews/?browsefilter=toprated";
    }
}

// Use in case of mfkdsamkfsdanusdnisd
function cleanUp() {
    localStorage.removeItem("steamguess");
    localStorage.steamguess = [];
    db = {};
}

// Reads every review within a given size and lets you choose which ones you wish to return
function getReviews() {
    const cards = document.getElementsByClassName("apphub_Card");
    var processed = [];
    var selected = [];

    for (let c = 0; c < cards.length; c += 1) {
        // Store page element references on constants
        const card = cards[c];
        const review_info = card.getElementsByClassName("reviewInfo")[0];
        const content = card.getElementsByClassName("apphub_CardTextContent")[0];
        const date = content.getElementsByClassName("date_posted")[0];
        const author = card.getElementsByClassName("apphub_CardContentAuthorName")[0];
        // Creates new object if the fields are validated
        if (content && review_info.getElementsByClassName("hours")[0]) {
            const reviewObj = {
                // Take all from content.innerText except date.innerText
                text: content.innerText.split(date.innerText)[1].trim(),
                author: author.innerText,
                profile: author.firstChild.attributes.href.value,
                date: date.innerText,
                recommend: review_info.getElementsByClassName("title")[0].innerText,
                hours: review_info.getElementsByClassName("hours")[0].innerText,
                found_helpful: card.getElementsByClassName("found_helpful")[0].innerText,
                game: window.location.href.split("app/")[1].split("/")[0]
            };
            // Only pushes the obj if the text is within a given size
            if (reviewObj.text.length < 500) {
                window.focus();
                processed.push(reviewObj);
            }
        }
    }

    // Uses confirm() to let you choose wich objects you want to store
    if (confirm("There are " + processed.length + " reviews for you to analyze.")) {
        for (let i = 0; i < processed.length; i += 1) {
            if (confirm(processed[i].hours + "\n" + processed[i].text)) {
                console.log(processed[i]);
                selected.push(processed[i]);
            }
        }
    };

    return selected;
}

// Stores game metadata into the database.
// CAREFUL! Doesn't check for redundancy.
function addGameToDatabase() {
    db.games.push({
        uid: gameUid,
        name: gameName
    });
}

// Stores the value of the db object as json on localStorage
function updateLocalStorage() {
    localStorage.steamguess = JSON.stringify(db);
}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

// Goes through every loaded review in the page and asks if you want to store them.
function crawl() {
    selectedReviews = getReviews();
    if (confirm("You just selected " + selectedReviews.length + " reviews! Do you want to update localStorage?")) {
        for (let i = 0; i < selectedReviews.length; i += 1) {
            db.reviews.push(selectedReviews[i]);
        }
        addGameToDatabase();
        updateLocalStorage();
        copyToClipboard(localStorage.steamguess);
    }
}
