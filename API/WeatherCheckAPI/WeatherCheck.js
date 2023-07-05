var request = require("request");
const APIKEY = "ea903679a6e5a44da75a971c0231f4f4"; 


var Lat = userLat.textContent;
var Lng = userLng.textContent;

var userLat = document.getElementById('latitude').innerText.trim(); // trim으로 공백을 제거하고 실제 값만 불러오기
var userLng = document.getElementById('longitude').innerText.trim(); // trim으로 공백을 제거하고 실제 값만 불러오기



request("https://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLng + "&appid=" + APIKEY + "&units=metric",function(error, response, body){
    if(!error&&response.statusCode==200)
    //request는 string으로 받아오기 때문에 JSON형태로 바꿔준다.
    var jsonObject = JSON.parse(body);
    var LocationName = jsonObject.name; //지역 이름
    var WeatherCondition = jsonObject.weather[0].main; //현재 날씨 
    var Temp = jsonObject.main.temp; //현재 기온
    //console.log(body);
    console.log(LocationName);
    console.log(WeatherCondition);
    console.log(Temp);
});

// https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 -> 날씨 종류 확인 가능