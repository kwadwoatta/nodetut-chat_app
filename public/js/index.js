var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');

    socket.on('createMessage', function(newMail) {
        console.log(newMail);
    })
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})
