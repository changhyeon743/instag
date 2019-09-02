module.exports = index;

var request = require('request');

function getRandomImage() {
    var n = Math.floor(Math.random() * 6) + 1; //1~4
    return "/images/"+n+".jpg";
}

function index(app) {
    app.get('/',function(req,res) {
        //res.render('index',{url:getRandomImage()});
        res.render('search',{style:"background:url("+getRandomImage()+" center"});
    })

    app.get('/help',function(req,res) {
        res.render('index',{url:getRandomImage()});
        //res.render('search',{style:"background:url("+getRandomImage()+" center"});
    })

    app.get('/search',function(req,res) {
        res.render('search',{style:"background:url("+getRandomImage()+" center"});
    })

    app.get('/result/:tag',function(req,res) {
        var count = 10;
        if (req.query.count) {
            count = req.query.count;
        }
        
        request(encodeURI("https://localhost:3000/hashtags/"+req.params.tag+"?count="+count), function (error, response, body) {
            // console.log(body);
            //console.log('body:', temp); // Print the HTML for the Google homepage.
            //if(response.statusCode == 404){
                res.render('result',{count: 0,datas: [],tag:"잘못된 태그입니다. (공백 X)"});
            //}else{
            //    var temp = JSON.parse(body);
            //    res.render('result',{count: temp.count,datas: temp.data,tag:req.params.tag});
            //}
        });
    })
}