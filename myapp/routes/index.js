module.exports = index;

var cheerio = require('cheerio');
var request = require('request');

/* GET home page. */
function index(app) {


  app.get('/hashtags/:tag', function (req, res) {
    var url = encodeURI('https://www.instagram.com/explore/tags/' + req.params.tag);
    var count = 10;
    if (req.query.count) {
      count = req.query.count;
    }
    request(url, function (error, response, body) {
      //TODO: variable names
      if (error) throw error
      let $ = cheerio.load(body);

      print($('body'))
      //HTML data: 가공되지 않은 데이터
      //replace, slice 는 json 형태로 만들기 위해 필요한 코드.
      let htmlData = $('body').children().next().html().replace('window._sharedData = ', '').slice(0, -1);
     
      let isError = false;
      ///htmlData 를 json으로 파싱
      let jsonData = null;
      try {
        jsonData = JSON.parse(htmlData);
      } catch (err) {
        console.error(err);
        isError = true;
      }
      console.log(jsonData)
      if (jsonData==null) {
        res.sendStatus(404);
      }

      if (!isError) {
        //이 코드는 html 파일을 읽으며 작성
        let temp_data = jsonData["entry_data"]["TagPage"][0]["graphql"]["hashtag"]["edge_hashtag_to_media"]["edges"];
        ///captions 에는 태그를 포함한 유저의 글이 모아짐.
        let captions = [];
        temp_data.forEach(element => {
          let temp = element["node"]["edge_media_to_caption"]["edges"][0];
          //if ["edges"][0] isn't null ~>
          if (temp != null) {
            captions.push(temp["node"]["text"]);
          }
        });
        console.log("log start ::::")
        console.log(captions)

        //captions에서 정규표현식을 이용해 해쉬태그 추출
        let hashtags = [];
        captions.forEach(element => {
          //#으로 시작해 공백이나 새로운#이 나타나지 않을 때까지 계속
          hashtags = hashtags.concat(element.match(/#([^\s#]+)/g));
        });

        //중복되는 요소들을 Dicitonary 형태로 합침
        var dic = {};

        for (var i = 0; i < hashtags.length; i++) {
          var num = hashtags[i];
          dic[num] = dic[num] ? ++dic[num] : 1;
        }

        //나온 결과 중, #태그 (자기 자신)와 null 값은 삭제
        delete dic["#" + req.params.tag];
        delete dic["null"];

        //예외처리
        if (dic.length > count) {
          res.status(404).send("Fail");
        }
        //console.log(dic);
        //최종결과
        var result = [];


        //count가 0이 될때까지 반복
        while (count > 0) {
          //최댓값 찾기
          var max = {
            count: 0
          };
          Object.keys(dic).map(function (v) {
            if (dic[v] > max.count) {
              max = {
                name: v,
                count: dic[v]
              };
            }
          });

          //찾고나서 찾은 값은 삭제
          delete dic[max.name];
          result.push(max);
          count--;
        }

        res.send({
          status: 200,
          count: hashtags.length,
          data: result
        });

      }



    })


  });

}

