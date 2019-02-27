document.addEventListener('DOMContentLoaded', () => {
const socket = io('/');

    setInterval(() => {
        navigator.geolocation.getCurrentPosition(res => {
            const Option = {
                timeout: 5000,
                enableHighAccuracy = true,
                maximumAge: 0
            }
            const { lat, lng } = res.coords;
            socket.emit('updateLoc',{lat, lng});
        }, err => {
            console.err(err);
        }, Option, 2000);
    });
});