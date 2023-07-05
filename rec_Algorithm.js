//받은 날씨 데이터를 바탕으로 음악 리스트를 추천해주는 알고리즘.

//input 값 = 날씨 데이터 ex) Thunderstorm
//output 값 = 리스트 형태의 제목-가수 정보 5쌍 ex) {(여자)아이들-tomboy, 혁오-tomboy, Dua Lipa-don't start now, 폴킴-너를 만나, Bruno Mars-Just the way you are}
//사용 언어 = javascript


//코드 전체적인 개요
// if(음악 추천하기 버튼 누름){
//     if(날씨 데이터가 일반적){날씨에 맞는 장르 추천, 추천한 장르 보고 맞는 노래 추천, 장르가 2개 이상이어서 노래가 5개를 넘을때는 random_5_Select 함수 사용}
//     if(날씨 데이터가 특수함(Snow)){직접 노래 추천}
//     추천받은 노래 5개의 제목과 가수 정보 데이터를 document.write함.
// }


function random_5_Select(array){ //사용시 array1 = random_5_Select(array1); 이렇게 해주면 됨
    array.sort(() => Math.random() - 0.5);
    array.splice(5);
    return array;
}

var rec_Genre = {};
var rec_Song = {};

if(true){
    if(WeatherCondition===Thunderstorm){
        rec_Song.concat(parsing(url_ballad), parsing(url_RNB_kr, parsing(url_RNB_us)));
        rec_song = random_5_Select(rec_song);
    }
    if(WeatherCondition===Drizzle){
        rec_Song.concat(parsing(url_ballad), parsing(url_RNB_kr, parsing(url_RNB_us)));
        rec_song = random_5_Select(rec_song);
    }
    if(WeatherCondition===Rain){
        rec_Song.concat(parsing(url_ballad), parsing(url_RNB_kr, parsing(url_RNB_us)));
        rec_song = random_5_Select(rec_song);
    }
    if(WeatherCondition===Clear){
        rec_Song.concat(parsing(url_hiphop_kr), parsing(url_hiphop_us), parsing(url_dance), parsing(url_rock_kr), parsing(url_rock_us));
        rec_song = random_5_Select(rec_song);
    }
    if(WeatherCondition===Clouds){
        rec_Song.concat(parsing(url_pop), parsing(url_RNB_kr), parsing(url_RNB_us), parsing(url_indie));
        rec_song = random_5_Select(rec_song);
    }
    if(WeatherCondition===Snow){rec_Song.concat(parsing_exception('snow'));}
    if(WeatherCondition===Mist){rec_Song.concat(parsing(url_newage));}
    if(WeatherCondition===Fog){rec_Song.concat(parsing(url_newage));}    
    
    //밑 4개 종류의 날씨는 거의 나올 확률이 없으므로 그냥 별 의미는 없이 newage장르로 매치함.
    if(WeatherCondition===Smoke){rec_Song.concat(parsing(url_newage));}
    if(WeatherCondition===Haze){rec_Song.concat(parsing(url_newage));}
    if(WeatherCondition===Dust){rec_Song.concat(parsing(url_newage));}
    if(WeatherCondition===Sand){rec_Song.concat(parsing(url_newage));}

    document.write(rec_song)
}

