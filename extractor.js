var cheerio = require('cheerio');
var request = require('request');

var reviews = [];
var games = [];
var domains = [
    'http://steamcommunity.com/profiles/76561198067853149/recommended/275850/',
    'http://steamcommunity.com/profiles/76561198109818684/recommended/314230/',
    'http://steamcommunity.com/id/erenpolat96/recommended/314230/',
    'http://steamcommunity.com/id/JebadiahGreen/recommended/314230/'
];
var domain;

function getHTML(err, resp, html) {
    if (err) {
        return console.error(err);
    }

    const $ = cheerio.load(html);
    var review = {};
    review.content = $('#ReviewText').html();
    review.gameUrl = $('a.panel_btn', '#rightContents').next().attr('href');
    review.game = review.gameUrl.split('/');
    review.game = review.game[review.game.length - 1];
    if (games.indexOf(review.game) === -1) {
        games.push(review.game);
    }
    review.rating = $('.ratingSummary').html();
    review.commentCount = $('.commentthread_count_label').children().first().html();
    review.author = $('.profile_small_header_name').children().first().html();
    console.log(review);

    console.log(games);
}

for (domain in domains) {
    if (domains) {
        request(domains[domain], getHTML);
    }
}
