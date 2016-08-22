function ajax() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                return (xmlhttp.responseText);
            }
        }
    };

    xmlhttp.open("GET", "http://localhost:8081", true);
    xmlhttp.send();
}

function getMatch(level) {}

(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCvLuqcppcxz_OCTFxGNfwkXh3a0KNE7F4",
        authDomain: "steamguess-3d25e.firebaseapp.com",
        databaseURL: "https://steamguess-3d25e.firebaseio.com",
        storageBucket: "steamguess-3d25e.appspot.com"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            document.getElementById("progress1").style.display = "none";
            console.log("auth: ", uid);
            // DO STUFF HERE
        } else {
            firebase.auth().signInAnonymously().catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        }
    });
})();
