console.clear();
const cheerio = require('cheerio');
const request = require('request');

var url = encodeURI('https://www.instagram.com/explore/tags/' + "Facebook");
request(url, function (error, response, body) {
    if (error) throw error
    let $ = cheerio.load(body);
    console.log($('script:not([src])'));
    // console.log($('<script type="text/javascript">'));
})