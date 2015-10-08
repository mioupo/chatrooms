var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var nameUsed = [];
var currentRoom = {};

export.listen = function(server){
	io = socketio.listen(server);

	io.set('log level',1);

	io.sockets.on('connection',function(socket){
		guestNumber = assignGuestName(socket,guestNumber,nickNames,nameUsed);
		//放入lobby聊天室
		joinRoom(socket,'Lobby');
		//广播
		handleMessageBroadcasting(socket,nickNames);

		handleNameChangeAttemps(socket,nickNames,nameUsed);

		handleRoomJoin(socket);

		socket.on('rooms',function(){
			socket.emit('rooms',io.sockets.manager.rooms);
		});

		handlerClientDisconnection(socket,nickNames,namesUsed);
	})
}

function assignGuestName(socket,guestNumber,nickNames,nameUsed){
	var name = 'Guest' + guestNumber;
	nickNames[socket.id] = name;
	socket.emit('nameResult',{
		success:true,
		name:name
	});
	nameUsed.push(name);
	return guestNumber+1;

}
function joinRoom(socket,room){
	socket.join(room);
	currentRoom[socket.id] = room;
	socket.emit('joinResult',{room:room});
	socket.broadcast.to(room).emit('message',{
		text: nickNames[socket.id]+'has joined '+room+'.'
	});

	var usersInRoom = io.socket.clients(room);

	if(usersInRoom.length>1){
		var usersInRoomSummary = 'Users currently in'+room+':';
		for(var index in usersInRoom){
			var
		}
	}

}

function handleMessageBroadcasting(socket,nickNames){

}

function handleNameChangeAttemps(socket,nickNames,nameUsed){

}

function handlerClientDisconnection(socket,nickNames,namesUsed){

}