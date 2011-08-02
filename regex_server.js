module.exports = (function () {
    return {
        startServer: function (io) {
            io.sockets.on('connection', function (socket) {
                socket.emit('connection', { message: 'connected.' });
                socket.on('find match', function (data) {
                    var regex = new RegExp(data.pattern, data.modifiers)
                    , matches = regex.exec(data.testText);
                    
                    socket.emit('match found', { results: matches });
                });
            });
        }
    };
}());