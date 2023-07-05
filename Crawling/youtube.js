//npm install youtube-node 후 실행

var Youtube = require('youtube-node');
var youtube = new Youtube();

var keyword = 'tomboy'; // 검색어 지정
var limit = 1;  // 출력 갯수

youtube.setKey('AIzaSyCXcFg7Aa9WkKfZc5wFcWdsMUJmYw1Yvmo'); 


function search(word) {
    youtube.search(word, limit, function (err, result) { // 검색 실행
        if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감

        //console.log(JSON.stringify(result, null, 2)); // 받아온 전체 리스트 출력

        var items = result["items"]; // 결과 중 items 항목만 가져옴
        var it = items[0];
        var video_id = it["id"]["videoId"];
        var url = "https://www.youtube.com/watch?v=" + video_id;
        console.log(url);
        
    });
}
search(keyword);
document.getElementById("url").innerHTML=url;
