module.exports = index;

var cheerio = require('cheerio');
var request = require('request');

/* GET home page. */
function index(app) {
  app.get('/hashtags/:tag', function(req, res) {
    var url = encodeURI('https://www.instagram.com/explore/tags/'+req.params.tag);
    request(url, function (error, response, body) {
      //TODO: variable names
        if(error) throw error
        let $ = cheerio.load(body);
        let title = $('body');
        let a = title.children().next().html().replace('window._sharedData = ','').slice(0,-1);
        
        let user = null
        try {
          user = JSON.parse(a);
        } catch(err) {
          console.error(err)
        }

        let datas = user["entry_data"]["TagPage"][0]["graphql"]["hashtag"]["edge_hashtag_to_media"]["edges"];

        let arr = [];
        datas.forEach(element => {
          let temp = element["node"]["edge_media_to_caption"]["edges"][0];
          if (temp!=null) {
            arr.push(temp["node"]["text"]);
          }
        });

        
        let real_arr = [];

        arr.forEach(element => {
          real_arr = real_arr.concat(element.match(/#([^\s#]+)/g));
          //console.log(real_arr);
        });

        var counts = {};
        
        for (var i = 0; i < real_arr.length; i++) {
          var num = real_arr[i];
          counts[num] = counts[num] ? ++counts[num]: 1;
        }
        
        
        res.send(counts);
        

        //var pattern = '/#([^\s#]+)/';
        //var pattern = /{"text":"(.*?)"}/;
        //let c = a.match(pattern);
        // let match = pattern.exec(a);
        
        // console.log("length : "+match.length)
        // match.forEach(i => {
        //   console.log(i);
        // });
      })
      

       //res.send(":)");
    //});
    // request(url, function(error, response, html){
      
    //     var $ = cheerio.load(html);
    //     $('span > section > main > article > ').each(function(){
    //       var title_info = $(this);
    //       var title_info_text = title_info.text();
    //     })
    // })
  });
  
}

