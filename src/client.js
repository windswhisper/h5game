var IP = "localhost";
var PORT = "8808";

function WebSocketClient(ip,port){
  this.ip = ip;
  this.port = port;
  this.connect = function(openCallback,messageCallback,closeCallback){
    var socket = new WebSocket('ws://'+ip+':'+port);
    socket.onopen = function(event) { 
      if(openCallback)openCallback();
      socket.onmessage = function(result,nTime){
        if(messageCallback)messageCallback(result);
      }
      socket.onclose = function(event) { 
        if(closeCallback)closeCallback();
      };
    };
    this.socket = socket;
  }

  this.send = function(msg){
    this.socket.send(msg);
  }

  this.close = function(){
    this.socket.close();
  }
}
