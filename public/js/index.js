var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');

    socket.on('newMessage', function(newMail) {
        console.log(newMail);
    })

    socket.emit('createMessage', 'hi there');
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})

socket.on('newEmail', function(email) {
    console.log('New email', email);
})