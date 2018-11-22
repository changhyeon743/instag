module.exports = index;

var cheerio = require('cheerio');
var request = require('request');

/* GET home page. */
function index(app) {
  app.get('/hashtags/:tag', function(req, res) {
    var url = encodeURI('https://www.instagram.com/explore/tags/'+req.params.tag);
    request(url, function (error, response, body) {
        if(error) throw error
        var $ = cheerio.load(body);
        $('html > body > span > section > main > article').each(function(){
          var title_info = $(this);
          var title_info_text = title_info.text();

          console.log(title_info_text);
        })
    });
    // request(url, function(error, response, html){
      
    //     var $ = cheerio.load(html);
    //     $('span > section > main > article > ').each(function(){
    //       var title_info = $(this);
    //       var title_info_text = title_info.text();
    //     })
    // })
  });
  
}

