var Logger = require("./Logger.js");
var EVENT = require("./EventConfig.js");

function Room() {
    var self = this;
    this.playerList = [];
    this.maxPlayer = 2;
    this.init = function(gameService,id) {
        self.gameService = gameService;
        self.id = id;

        Logger.log("room create","id:"+self.id);
    }
    this.join = function(client) {
        if (self.playerList.length < self.maxPlayer) {
            self.playerList.push(client);
            client.room = self;
            client.on(EVENT.ROOM_BROADCAST,function(data){
                for (var i = 0; i < self.playerList.length; i++) {
                    if (self.playerList[i] != client) {
                        self.playerList[i].emit(EVENT.ROOM_BROADCAST_RESULT,data);
                    }
                }
            });

            for (var i = 0; i < self.playerList.length; i++) {
                if (self.playerList[i] != client) {
                    self.playerList[i].emit(EVENT.PLAYER_JOIN,client.id);
                }
            }

            Logger.log("room join","id:"+self.id+",count:"+self.playerList.length);
            return true;
        } else {
            return false;
        }
    };
    this.leave = function(client) {
        for (var i = 0; i < self.playerList.length; i++) {
            if (self.playerList[i] == client) {
                self.playerList.splice(i, 1);
                client.room = null;
                for (var j = 0; j < self.playerList.length; j++) {
                    if (self.playerList[j] != client) {
                        self.playerList[j].emit(EVENT.PLAYER_LEAVE,client.id);
                    }
                }
            }
        }
        Logger.log("room leave","id:"+self.id+",playCount:"+self.playerList.length);
           
        if(self.playerList.length==0){
            self.destroy();
        } 
    };
    this.destroy = function() {
        Logger.log("room destroy","id:"+self.id+",playCount:"+self.playerList.length);
        
    };

    this.isFull = function(){
        return self.playerList.length==self.maxPlayer;
    };
}
module.exports = Room;