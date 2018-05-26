var Room = require("./Room.js");
var Logger = require("./Logger.js");
var EVENT = require("./EventConfig.js");


var MIN_ROOM_ID = 1000;
var MAX_ROOM_ID = 9999;

function GameService() {
    var self = this;
    this.roomIdCounter = MIN_ROOM_ID;
    this.clientList = [];
    this.roomList = [];
    this.onConnect = function(client) {
        self.clientList.push(client);
        client.on(EVENT.CREATE_ROOM, function() {
            self.createRoom(client);
        });
        client.on(EVENT.JOIN_ROOM, function(roomId) {
            self.joinRoom(client, roomId);
        });
        client.on(EVENT.LEAVE_ROOM, function() {
            self.leaveRoom(client);
        });
        client.on(EVENT.FIND_ROOM, function() {
            self.findRoom(client);
        });

        Logger.log("client connect", "playerCount:" + self.clientList.length);
    };
    this.onDisconnect = function(client) {
        for (var i = 0; i < self.clientList.length; i++) {
            if (self.clientList[i] == client) {
                self.clientList.splice(i, 1);
                break;
            }
        }
        if (client.room) {
            client.room.leave(client);
        }

        Logger.log("client disconnect", "playerCount:" + self.clientList.length);
    };

    this.createRoom = function(client) {
        var room = new Room();
        var roomId = self.roomIdCounter++;
        if (self.roomIdCounter > MAX_ROOM_ID) { self.roomIdCounter = MIN_ROOM_ID; };
        room.init(self, roomId);
        self.roomList.push(room);
        var roomId = room.join(client);
        client.emit(EVENT.CREATE_ROOM_RESULT, '{"code":0,"roomId":'+roomId+'}');

        Logger.log("room create", "roomCount:" + self.roomList.length);

        return room;
    };
    this.joinRoom = function(client, roomId) {
        for (var i = 0; i < self.roomList.length; i++) {
            if (self.roomList[i].id == roomId) {
                var res = self.roomList[i].join(client);
                if (res) {
                    client.emit(EVENT.JOIN_ROOM_RESULT, '{"code":0,"msg":"success"}');
                } else {
                    client.emit(EVENT.JOIN_ROOM_RESULT, '{"code":1,"msg":"room is full"}');
                }
            }
        }
    };
    this.leaveRoom = function(client) {
        if (client.room != null) {
            client.room.leave(client);
        }
    };
    this.destroyRoom = function(roomId) {
        for (var i = 0; i < self.roomList.length; i++) {
            if (self.roomList[i].id == roomId) {
                self.roomList.splice(i, 1);
                break;
            }
        }
    }
    this.findRoom = function(client) {
        if(self.waitingRoom){
            
            self.waitingRoom.join(client);

            if(self.waitingRoom.isFull())
            {
                for (var i = 0; i < self.waitingRoom.playerList.length; i++) {
                    self.waitingRoom.playerList[i].emit(EVENT.FIND_ROOM_RESULT);
                }
                self.waitingRoom = null;
            }
        }
        else{
            self.waitingRoom = self.createRoom(client);
        }
    };


}
module.exports = GameService;