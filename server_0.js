var cons = new Array();
var ws = require('ws').Server;
var server = new ws({port:8808});

var waitingclient = 0;

function Client(ws){
  this.wsconnect = ws;
  this.setid = function(id){
    this.id = id
  };
  this.join = function(op){
     this.op = op
     this.wsconnect.on('message',function(data){
      op.send(data);
    });
  };
  this.onmsg = function(msg){
    this.op.send(msg)
  };
}

server.on('connection',function(ws){
  console.log('new connection founded successfully');

  cons.push(ws);


  if(waitingclient == 0 )waitingclient = ws;
  else {
    var c1 = new Client(ws);
    var c2 = new Client(waitingclient);
    c1.join(waitingclient);
    c2.join(ws);
    waitingclient = 0;
  }

  ws.on('close',function(){
    for(var i=0;i<cons.length;i++){
       if(cons[i] == ws) cons.splice(i,1);
    }
  });
});



var http = require('http');
var fs   = require("fs");

http.createServer(function (request, response) {
  // 发送 HTTP 头部 
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  response.writeHead(200, {'Content-Type': 'text/html'});
  var url = request.url;
  fs.readFile(url.slice(1),function (err,data){
                response.end(data);
            });
}).listen(18080);

