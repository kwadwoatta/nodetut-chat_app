var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('createMessage', function(message) {
    console.log(message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newMessage', function(message) {
    console.log(message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server')
});

socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target=_blank> My current location </a>')
    li.text(`${message.from}: `);
    a.attr('href', message.url)
    li.append(a);
    $('#messages').append(li)
})

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val(''); // This clears the textbox after message is sent
    })
})

var locationButton = $('#send-location');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...'); // This adds the disabled attribute to the location button

    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
    },  function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
})
