var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var easymidi = require('easymidi');
var midiInput = new easymidi.Input('IAC Driver Bus 1');


midiInput.on('noteon', function (params) {
  // do something with msg
  console.log('NOTE ON ' + params['note']);
  io.emit('chat message', 'NOTE ON ' + params['note']);
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
});
