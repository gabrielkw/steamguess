// this is for simulation purposes only
(function() {
    'use strict';
    var s = [0, 0, -1, 0, 0];
    var correct = 2;
    for (let i = 0; i < 1000; i += 1) {
        var guess = Math.floor(Math.random() * 5);
        if (guess !== correct) {
            for (let i = 0; i < s.length; i += 1) {
                if (i !== correct) {
                    var expectancy = 0.2;
                    var weight = 1;
                    if (i === guess) {
                        s[i] += Math.pow(10, (s[i] / 400)) * weight;
                    } else {
                        s[i] -= (Math.pow(10, (s[i] / 400)) * weight) / 5;
                    }
                }
            }
        }
        console.log();
        console.log("Game number:" + i);
        console.log("guess:" + guess);
        console.log("s-rank:");
        for (let i = 0; i < s.length; i += 1) {
            console.log(i, s[i]);
        }
    }
}());
