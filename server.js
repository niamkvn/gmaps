const express = require('express');
const path = require('path');

const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);

const mappingLoc = new Map();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello world');
});

io.on('connection', socket => {
    //inisialisasi mapping lokasi
    mappingLoc.set(socket.id, { lat: null, lng: null });
    socket.on('_ping', ()=>{
        console.log('get ping');
        socket.emit('_pong');
    });


    socket.on('updateLoc', cont => {
        if (mappingLoc.has(socket.id)) {
            //setting posisi
            mappingLoc.set(socket.id, cont);
        }
    });

    //handle req posisi
    // socket.on('reqPos', () => {
    //     socket.emit('updatePos', Array.from(mappingLoc));
    // });

    //event disconnect
    socket.on('disconnect', () => {
        mappingLoc.delete(socket.id);
    });
});