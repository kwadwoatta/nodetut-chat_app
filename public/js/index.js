var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');

    socket.on('createMessage', function(inbox) {
        console.log(inbox);
    })

    socket.on('newMessage', function(msg) {
        console.log(msg)
    })
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})
