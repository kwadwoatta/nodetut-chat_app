const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users')
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname + './../public');

const app = express();

var server = http.createServer(app)
var io = socketIO(server);
var users = new Users();

// Express static middleware that serves up the html file
app.use(express.static(publicPath));

// This let's you register an event listener
io.on('connection', (socket) => {
    console.log('New user connected')
 
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required')
        } 
            socket.join(params.room)
            users.removeUser(socket.id)
            users.addUser(socket.id, params.name, params.room);  

            io.to(params.room).emit('updateUserList', users.getUserList(params.room))
            socket.emit('newMessage', generateMessage('Admin', 'Hello there welcome to our chat app'))
            /* socket.emit.broadcast broadcasts the message to all users except sender */
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
            callback();
    }) 

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id)

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
    
    socket.on('disconnect', () => {
        var user =  users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})