module.exports = index;

function index(app) {
    app.get('/',function(req,res) {
        res.render('index',{url:"https://cdn.pixabay.com/photo/2016/11/29/04/19/beach-1867285_1280.jpg"});
    })

    app.get('/search',function(req,res) {
        res.render('search',{url:"background:url(https://cdn.pixabay.com/photo/2016/11/29/04/19/beach-1867285_1280.jpg) center"});
    })

    app.get('/result',function(req,res) {
        res.render('result',{url:"https://cdn.pixabay.com/photo/2016/11/29/04/19/beach-1867285_1280.jpg"});
    })
}