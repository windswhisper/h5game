var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http).listen(8808);

var GameService = require('./GameService');
var gameService = new GameService();

io.on('connection', function(client){
    gameService.onConnect(client);

    client.on('disconnect', function(){
	    gameService.onDisconnect(client);
	});
	client.on('error', function(){
	    gameService.onDisconnect(client);
	});
});


http.listen(18080, function(){
    console.log('listening on *:18080');
});