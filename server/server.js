const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js')

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname + './../public');

const app = express();


var server = http.createServer(app)
var io = socketIO(server);

// Express static middleware that serves up the html file
app.use(express.static(publicPath));

// This let's you register an event listener
io.on('connection', (socket) => {
    console.log('New user connected')
    
    socket.emit('newMessage', generateMessage('Admin', 'Hello there welcome to our chat app'))
    
    /* socket.emit.broadcast broadcasts the message to all users except sender */
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('CreateMessage', message);

        io.emit('newMessage', {
            text: message.text,
            from: message.from,
            createdAt: new Date().getTime()
        });

        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})