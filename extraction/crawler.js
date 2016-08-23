/* This file has functions for crawling the reviews page of any Steam Game
This script is meant to be pasted on your browser's Javascript Console
The localStorage is widely used here because it keeps data consistent among
every page of a domain */
localStorage.steamguess = localStorage.steamguess || JSON.stringify({
    reviews: [],
    games: []
});

/* The variable db is meant to be an object based on the json
saved on localStorage.steamguess. It can later be saved as json
to the localStorage with the updateLocalStorage() function */
var db = JSON.parse(localStorage.steamguess);

// Getting information about the game from the page
var gameUid = window.location.href.split("app/")[1].split("/")[0];
var gameName = document.getElementsByClassName("apphub_AppName")[0].innerText;

if (window.location.href.indexOf("steam") > 0) {
    if (window.location.href.indexOf("http://steamcommunity.com/app/" + gameUid + "/reviews/?browsefilter=toprated") < 0) {
        // Detects URL and properly redirects to the reviews page so it can access the proper localStorage instance
        if (confirm("This doesn't look like the reviews page! Do you want to go to the reviews page?")) {
            window.location.href = "http://steamcommunity.com/app/" + gameUid + "/reviews/?browsefilter=toprated";
        }
    }
} else {
    alert("This doesn't look like a steam page!");
}


function cleanUp() {
    /* Use in case of mfkdsamkfsdanusdnisd */
    localStorage.removeItem("steamguess");
    localStorage.steamguess = [];
    db = {};
}

function getReviews() {
    /* Reads every review within a given size and lets you
    choose which ones you wish to return */
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
        // Create new object if the fields are validated
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
            // Only push the obj if the text is within a given size
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

function addGameToDatabase() {
    /* Stores game metadata into the database.
    CAREFUL! Doesn't check for redundancy. */
    db.games.push({
        uid: gameUid,
        name: gameName
    });
}

function updateLocalStorage() {
    /* Stores the value of the db object as json on localStorage */
    localStorage.steamguess = JSON.stringify(db);
}

function copyToClipboard(text) {
    /* I use this little gem to extract strings with more
    than 20000 characters */
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function copyDb() {
    copyToClipboard(localStorage.steamguess);
}

function pasteDb() {
    /* This is for pasting stringified JSON so you can continue working
    with previously fetched data */
    localStorage.steamguess = window.prompt("Paste your JSON here");
    db = JSON.parse(localStorage.steamguess);
}

function crawl() {
    /* Goes through every loaded review in the page and asks which ones are
    saved to the database. */
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
