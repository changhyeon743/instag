module.exports = index;

var request = require('request');


function index(app) {
    app.get('/',function(req,res) {
        res.render('index',{url:"https://cdn.pixabay.com/photo/2016/11/29/04/19/beach-1867285_1280.jpg"});
    })

    app.get('/search',function(req,res) {
        res.render('search',{url:"background:url(https://cdn.pixabay.com/photo/2016/11/29/04/19/beach-1867285_1280.jpg) center"});
    })

    app.get('/result/:tag',function(req,res) {
        request(encodeURI("http://localhost:3000/hashtags/"+req.params.tag+"?count=10"), function (error, response, body) {
            var temp = JSON.parse(body);
            //console.log('body:', temp); // Print the HTML for the Google homepage.
            
            res.render('result',{count: temp.count,datas: temp.data,tag:req.params.tag});
        });
    })
}