document.addEventListener('DOMContentLoaded', () => {
const socket = io('/');

socket.emit('_ping')

socket.on('_pong', ()=>{
    console.log('get pong')
})

const userPosition ={
    latitude : null,
    longitude : null
}

    setInterval(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const Option = {
                timeout: 5000,
                enableHighAccuracy : true,
                maximumAge: 0
            }
            const { latitude: lat, longitude: lng } = position.coords;
            socket.emit('updateLoc',{lat, lng});
            userPosition.latitude = lat;
            userPosition.longitude = lng;
        }, err => {
            console.log(err);
        }, Option);
    }, 5000);




// Get User's Coordinate from their Browser
// window.onload = function() {
//     // HTML5/W3C Geolocation
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(UserLocation);
//     }
//     // Default to Washington, DC
//     else
//       NearestCity(38.8951, -77.0367);
//   }
  

  // Callback function for asynchronous call to HTML5 geolocation
  function UserLocation(position) {
    NearestCity(userPosition.latitude, userPosition.longitude);
  }
  
  
  // Convert Degress to Radians
  function Deg2Rad(deg) {
    return deg * Math.PI / 180;
  }
  
  function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
  }
  
  var cities = [
    ["malang", -7.9797, 112.6304],
    ["surabaya", 7.250445, 112.768845]
  ];
  
  function NearestCity(latitude, longitude) {
    var mindif = 99999;
    var closest;
  
    for (index = 0; index < cities.length; ++index) {
      var dif = PythagorasEquirectangular(latitude, longitude, cities[index][1], cities[index][2]);
      if (dif < mindif) {
        closest = index;
        mindif = dif;
      }
    }
  
    // echo the nearest city
    alert(cities[closest]);
  }

});