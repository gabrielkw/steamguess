(function() {
    'use strict';
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCvLuqcppcxz_OCTFxGNfwkXh3a0KNE7F4",
        authDomain: "steamguess-3d25e.firebaseapp.com",
        databaseURL: "https://steamguess-3d25e.firebaseio.com",
        storageBucket: "steamguess-3d25e.appspot.com"
    };
    firebase.initializeApp(config);

    const txtInput = document.getElementById("txtInput");
    const submitButton = document.getElementById("submitButton");
    const messagesDiv = document.getElementById("messages");

    submitButton.addEventListener('click', function() {
        var newPostKey = firebase.database().ref().child('posts').push(txtInput.value);
        txtInput.value = "";
    });

    const dbRef = firebase.database().ref("posts");
    dbRef.on('value', function(snapshot) {
        var messages = "";
        snapshot.forEach(function(childObject) {
            messages += childObject.val() + "<br/>";
        });
        messagesDiv.innerHTML = messages;
    });
})();
