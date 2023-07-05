// 사용 전 npm 설치
// npm install express express-session session-file-store passport passport-local
// npm install body-parser --save

var express = require('express');
var app = express();
var fs = require('fs');
const exp = require('constants');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
const axios = require("axios");
const cheerio = require("cheerio");
// const fetch = require('node-fetch');

const url_ballad = "https://www.melon.com/genre/song_list.htm?gnrCode=GN0100#params%5BgnrCode%5D=GN0100&params%5BdtlGnrCode%5D=&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_hiphop_kr = "https://www.melon.com/genre/song_list.htm?gnrCode=GN0300#params%5BgnrCode%5D=GN0300&params%5BdtlGnrCode%5D=&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_hiphop_us = "https://www.melon.com/genre/song_list.htm?gnrCode=GN1200#params%5BgnrCode%5D=GN1200&params%5BdtlGnrCode%5D=GN1201&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_dance = "https://www.melon.com/genre/song_list.htm?gnrCode=GN0200#params%5BgnrCode%5D=GN0200&params%5BdtlGnrCode%5D=&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_rock_kr = "https://www.melon.com/genre/song_list.htm?gnrCode=GN0600#params%5BgnrCode%5D=GN0600&params%5BdtlGnrCode%5D=&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_rock_us = "https://www.melon.com/genre/song_list.htm?gnrCode=GN1000#params%5BgnrCode%5D=GN1000&params%5BdtlGnrCode%5D=GN1001&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_pop = "https://www.melon.com/genre/song_list.htm?gnrCode=GN0900#params%5BgnrCode%5D=GN0900&params%5BdtlGnrCode%5D=GN0901&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_RNB_kr = "https://www.melon.com/genre/song_list.htm?gnrCode=GN0400#params%5BgnrCode%5D=GN0400&params%5BdtlGnrCode%5D=&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_RNB_us = "https://www.melon.com/genre/song_list.htm?gnrCode=GN1300#params%5BgnrCode%5D=GN1300&params%5BdtlGnrCode%5D=GN1301&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_indie = "https://www.melon.com/genre/song_list.htm?gnrCode=GN0500#params%5BgnrCode%5D=GN0500&params%5BdtlGnrCode%5D=GN0501&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_newage = "https://www.melon.com/genre/song_list.htm?gnrCode=GN1800#params%5BgnrCode%5D=GN1800&params%5BdtlGnrCode%5D=GN1801&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex=1"
const url_jazz = "https://www.melon.com/genre/jazz_list.htm?gnrCode=GN1700#params%5BgnrCode%5D=GN1700&params%5BdtlGnrCode%5D=GN1701&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=&po=pageObj&startIndex=1"

var Youtube = require('youtube-node');
var youtube = new Youtube();
var limit = 1;
youtube.setKey('AIzaSyCXcFg7Aa9WkKfZc5wFcWdsMUJmYw1Yvmo'); 


app.get('/music', cors(), function (req, res, next) { 
    // var lat=req.query.userLat;
    // var long=req.query.userLng;

    var lat = 37;
    var long = 127;

    const APIKEY = "ea903679a6e5a44da75a971c0231f4f4"; 
    request("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + APIKEY + "&units=metric",function(error, response, body){
    // fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLng + "&appid=" + APIKEY + "&units=metric") 
    // .then((response) => response.json())
    // .then(jsonObject => {
    if(!error&&response.statusCode==200)
    //request는 string으로 받아오기 때문에 JSON형태로 바꿔준다.
    var jsonObject = JSON.parse(body);

    var WeatherCondition = jsonObject.weather[0].main; //현재 날씨 
 
   
    var rec_song = [];

    if(WeatherCondition==="Thunderstorm"){
        rec_song.concat(parsing(url_ballad), parsing(url_RNB_kr), parsing(url_RNB_us));
        rec_song = random_5_Select(rec_song);
    }
    if(WeatherCondition==="Drizzle"){
        rec_song.concat(parsing(url_ballad), parsing(url_RNB_kr), parsing(url_RNB_us));
        rec_song = random_5_Select(rec_song);
    }
    if(WeatherCondition==="Rain"){
        rec_song.concat(parsing(url_ballad), parsing(url_RNB_kr), parsing(url_RNB_us));
        rec_song = random_5_Select(rec_song);
    }
    if(WeatherCondition==="Clear"){
        rec_song.concat(parsing(url_hiphop_kr), parsing(url_hiphop_us), parsing(url_dance), parsing(url_rock_kr), parsing(url_rock_us));
        rec_song = random_5_Select(rec_song);
    }
    if(WeatherCondition==="Clouds"){
        rec_song.concat(parsing(url_pop), parsing(url_RNB_kr), parsing(url_RNB_us), parsing(url_indie));
        rec_song = random_5_Select(rec_song);
    }
    if(WeatherCondition==="Snow"){rec_song.concat(parsing_exception('snow'));}
    if(WeatherCondition==="Mist"){rec_song.concat(parsing(url_newage));}
    if(WeatherCondition==="Fog"){rec_song.concat(parsing(url_newage));}    
    
    //밑 4개 종류의 날씨는 거의 나올 확률이 없으므로 그냥 별 의미는 없이 newage장르로 매치함.
    if(WeatherCondition==="Smoke"){rec_song.concat(parsing(url_newage));}
    if(WeatherCondition==="Haze"){rec_song.concat(parsing(url_newage));}
    if(WeatherCondition==="Dust"){rec_song.concat(parsing(url_newage));}
    if(WeatherCondition==="Sand"){rec_song.concat(parsing(url_newage));}

    // for (var a = 0; a < 5; a++) {
    //     var url1 = search(rec_song[a]);
    //     res.json({link: url1}) 
    // }
    var url1 = search(rec_song[0])
    res.json({link: url1}) 
    //document.write(rec_song)

});

const getHTML = async(genre) => {
    try{
        return await get(genre)
    }catch(err) {
        console.log(err);
    }
}
const parsing = async(genre) => {
    const html = await getHTML(genre);
    const $ = cheerio.load(html.data); 
    const $TitleList = $("div.ellipsis.rank01");
    

    let Titles = [];
    $TitleList.each((index, node) => {
        const title = $(node).find("a").text();
        Titles[Titles.length] = title;
    });

    let Titles5 = [];
    for(i = 0; i <= 4; i++){
        Titles5.push(Titles[i])
    };
    
    console.log(Titles5);
    return(Titles5);
}

const parsing_exception = (genre) => { // 'snow' 또는 'classic' 에만 작동합니다.
    snow = ['눈사람', '십이월 이십오일의 고백', '첫 눈', '첫눈처럼 너에게 가겠다', '겨울사랑', '눈꽃', '사월의 눈', '코끝에 겨울', '눈이 내린다', '새겨울', '공드리',
'눈이 오네', '이번 겨울', 'I Miss You', '나의 옛날 이야기', '너의 모든 순간', '내 생에 아름다운', '너를', '눈의꽃', '야생화'];

    classic = ['G선상의 아리아', '트로이메라이', '무언가', '백조', '세레나데', '울게하소서', '카발레리아 루스티카나', '사랑의 인사', '보칼리제', '뱃노래',
'안단테 칸타빌레', '월광의 소나타', '미뉴엣 G장조', '엘리제를 위하여', '로망스'];

    function shuffleArray(array) { // array의 요소들을 임의로 섞어주는 함수
    array.sort(() => Math.random() - 0.5);
    }
    shuffleArray(snow); //실행할 때마다 snow와 classic에 들어있는 요소들을 랜덤으로 배치
    shuffleArray(classic);

    let snow5 = [];// 그 중 앞에서 5개를 뽑아 제공
    let classic5 = [];
    for(i = 0; i <= 4; i++){
        snow5.push(snow[i])
    };

    for(i = 0; i <= 4; i++){
        classic5.push(classic[i])
    };

    if(genre == 'snow'){
        console.log(snow5); // console.log() 는 값 시험용으로 우선 넣어두었습니다.
        return(snow5);
    }else if(genre == 'classic'){
        console.log(snow5); // 
        return(classic5);
    }else{
        console.log("input value error(The input value is snow or classic)");
    }
}

function random_5_Select(array){ //사용시 array1 = random_5_Select(array1); 이렇게 해주면 됨
    array.sort(() => Math.random() - 0.5);
    array.splice(5);
    return array;
}

function search(word) {
    youtube.search(word, limit, function (err, result) { // 검색 실행
        if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감

        //console.log(JSON.stringify(result, null, 2)); // 받아온 전체 리스트 출력

        var items = result["items"]; // 결과 중 items 항목만 가져옴
        var it = items[0];
        var video_id = it["id"]["videoId"];
        var url = "https://www.youtube.com/watch?v=" + video_id;
        console.log(url);
        return url;
        
    });
}

// if('구현: 음악 추천하기 버튼 누름'){
//     if(WeatherCondition===Thunderstorm){
//         rec_Song.concat(parsing(url_ballad), parsing(url_RNB_kr, parsing(url_RNB_us)));
//         rec_song = random_5_Select(rec_song);
//     }
//     if(WeatherCondition===Drizzle){
//         rec_Song.concat(parsing(url_ballad), parsing(url_RNB_kr, parsing(url_RNB_us)));
//         rec_song = random_5_Select(rec_song);
//     }
//     if(WeatherCondition===Rain){
//         rec_Song.concat(parsing(url_ballad), parsing(url_RNB_kr, parsing(url_RNB_us)));
//         rec_song = random_5_Select(rec_song);
//     }
//     if(WeatherCondition===Clear){
//         rec_Song.concat(parsing(url_hiphop_kr), parsing(url_hiphop_us), parsing(url_dance), parsing(url_rock_kr), parsing(url_rock_us));
//         rec_song = random_5_Select(rec_song);
//     }
//     if(WeatherCondition===Clouds){
//         rec_Song.concat(parsing(url_pop), parsing(url_RNB_kr), parsing(url_RNB_us), parsing(url_indie));
//         rec_song = random_5_Select(rec_song);
//     }
//     if(WeatherCondition===Snow){rec_Song.concat(parsing_exception('snow'));}
//     if(WeatherCondition===Mist){rec_Song.concat(parsing(url_newage));}
//     if(WeatherCondition===Fog){rec_Song.concat(parsing(url_newage));}    
    
//     //밑 4개 종류의 날씨는 거의 나올 확률이 없으므로 그냥 별 의미는 없이 newage장르로 매치함.
//     if(WeatherCondition===Smoke){rec_Song.concat(parsing(url_newage));}
//     if(WeatherCondition===Haze){rec_Song.concat(parsing(url_newage));}
//     if(WeatherCondition===Dust){rec_Song.concat(parsing(url_newage));}
//     if(WeatherCondition===Sand){rec_Song.concat(parsing(url_newage));}

//     document.write(rec_song)
// }



    
    //res.json({link: "결과 문자열"}) 
}) 



//미들웨어 리스트
// app.use(urlencoded({extended:false}));
// app.use(session({
//     secret: 'secret key',
//     resave: false,
//     saveUninitialized: false,
//     store : new fileStore()
//   }));
// app.use(initialize());
// app.use(_session());
// app.use(static('public'));
// app.use(_urlencoded({extended:false}));

//사용자 정보 session 읽기, 쓰기
// serializeUser(function(user, done) {   //쓰기
//     done(null, user.email);
// });

// deserializeUser(function(id, done) {   //읽기
//     done(null, id);
// });

//메인 페이지
app.get('/', function (req, res) {
    fs.readFile('main.html', function(error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});



//포트 연결
app.listen(3000, function() {
    console.log('http://localhost:3000');
});


