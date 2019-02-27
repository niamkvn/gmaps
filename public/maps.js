document.addEventListener('DOMContentLoaded', () => {
    const map;
    const socket = io('/');
    const mappingMarkers = new Map();

    // socket.on('updatePos', cont => {
    socket.on('updateLoc', cont => {
        mappingMarkers.forEach((val, ind) => {
            val.setMap(null)
            mappingMarkers.delete(ind);
        });

        cont.forEach(([val, ind]) => {
            if (val.lat && val.lng) {
                //adding marker to the map
                const marker = new google.maps.Marker({
                    //coord
                    position: val,
                    map: map
                });
                //Map() args -> key, val
                mappingMarkers.set(ind, val);
            }
        });
    });

    //req position 
    // setInterval(() => {
    //     socket.emit('reqPos');
    // }, 2000)

    //create the map
    function initMap() {
        navigator.geolocation.getCurrentPosition(res => {
            const option = {
                zoom: 8,
                center: { lat: res.lat, lng: res.lng }
            }
            map = new google.map.Map(document.getElementById('maps', option));
        })
    }

});