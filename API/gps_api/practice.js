if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Your browser is not support geolocation.")//navigator이 현재 브라우저에서 작동하지 않는 경우 
  }

 function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude 
    console.log(`Your latitude is ${latitude} and your longitude is ${longitude}`) // 위도와 경도 값을 console로 알려줌
    // document.getElementById("lat").innerHTML=latitude;
    // document.getElementById("long").innerHTML=longitude;
      return (latitude, longitude);
      
  }


  function error() {
    alert("Can't detect your location. Try again later.") // error function
  }
