const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    socket.on('createMessage', (outbox) => {
        console.log(outbox);

        io.emit('createMessage', {
            text: outbox.text,
            from: outbox.from,
            createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})