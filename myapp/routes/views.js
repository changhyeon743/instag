module.exports = index;

var request = require('request');

function getRandomImage() {
    var n = Math.floor(Math.random() * 6) + 1; //1~4
    return "/images/"+n+".jpg";
}
function index(app) {
    app.get('/',function(req,res) {
        res.render('index',{url:getRandomImage()});
    })

    app.get('/search',function(req,res) {
        res.render('search',{url:"background:url("+getRandomImage()+" center"});
    })

    app.get('/result/:tag',function(req,res) {
        request(encodeURI("http://localhost:3000/hashtags/"+req.params.tag+"?count=10"), function (error, response, body) {
            //console.log('body:', temp); // Print the HTML for the Google homepage.
            if(response.statusCode == 404){
                res.render('result',{count: 0,datas: [],tag:"사용되지 않는 태그입니다."});
            }else{
                var temp = JSON.parse(body);
                res.render('result',{count: temp.count,datas: temp.data,tag:req.params.tag});
            }
        });
    })
}