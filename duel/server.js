var app = require('express')();

var https=require('https');
var fs=require('fs');
var keypath='x/ssl.key';
var certpath='x/ssl.crt';
 
var options = {
  key: fs.readFileSync(keypath),
  cert: fs.readFileSync(certpath),
};
 
 
var server = https.createServer(options, function () {});

var io = require('socket.io')(server);

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

server.listen(4431,"127.0.0.1");