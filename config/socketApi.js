var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
var Chat = require('../models/chatModels');

socketApi.io = io;

io.on('connect', onConnect);

function onConnect(socket) {

    socket.on('join', data => {
        socket.join(data.senderEmail)
    });
    //Maybe insert into database from here instead of making a new post request from the client
    socket.on('send', async data => {
        io.to(data.recipienEmail).emit('new_msg', data);
        await Chat.storeMessage(data)

    });

    console.log('A user connected');
};

socketApi.sendNotification = function () {
    io.sockets.emit('hello', { msg: 'Hello World!' });
}

module.exports = socketApi; 