// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');
    let username;

    socket.on('set username', (name) => {
        username = name;
        console.log(`User set username: ${username}`);
    });

    socket.on('chat message', (data) => {
        const { message, sender } = data;
        io.emit('chat message', { message, sender });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
