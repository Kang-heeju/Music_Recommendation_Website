const axios = require("axios");
const cheerio = require("cheerio");

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
const url_classic = ""
const url_jazz = "https://www.melon.com/genre/jazz_list.htm?gnrCode=GN1700#params%5BgnrCode%5D=GN1700&params%5BdtlGnrCode%5D=GN1701&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=&po=pageObj&startIndex=1"


const getHTML = async(genre) => {
    try{
        return await axios.get(genre)

    }catch(err) {
        console.log(err);
    }
}
// parsing() 함수는 한가지 파라미터를 가집니다. 파라미터에 각 장르이름 변수를 넣으면 각 장르별 5곡이 리턴됩니다.
// 장르별 변수명은 다음과 같습니다.
// url_ballad
// url_hiphop_kr
// url_hiphop_us
// url_dance
// url_rock_kr
// url_rock_us
// url_pop
// url_RNB_kr
// url_RNB_us
// url_indie
// url_newage
// url_jazz
// parsing_exception()은 한가지 파라미터를 가집니다. 그 인자는 'snow' 또는 'classic'으로 해야 합니다.
// 'classic' 이나 'snow'를 인자로 주면 각각 배열에 저장되어있는 노래 중 랜덤으로 5개가 출력됩니다.
// classic
// snow

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

// parsing(url_ballad);
// parsing_exception('snow');

var ballad = parsing(url_ballad);
document.getElementByld("div1").innerHTML(ballad[0]);







