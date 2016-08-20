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

    var messages = "";
    const container = document.getElementById("container");
    const dbRef = firebase.database().ref("reviews");
    dbRef.once('value', function(snapshot) {
        snapshot.forEach(function(childObject) {
            messages += "<hr><h5><a href='"+childObject.val().profile+"'>"+childObject.val().author+"</a></h5>"+
            childObject.val().date+"</br>"+
            childObject.val().found_helpful+"</br>"+
            childObject.val().hours+"</br>"+
            childObject.val().recommend+"</br>"+
            "<h3>"+childObject.val().text + "</h3><br/><br/>";
        });
        container.innerHTML = messages;
    });
})();
