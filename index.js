var express = require('express'),
    WebSocket = require('ws'),
    easymidi = require('easymidi');


var midiInput = new easymidi.Input('IAC Driver Bus 1');

var appResources = __dirname + "/frontend",
    app = express(),
    server = app.listen(8081),
    wss = new WebSocket.Server({
        server: server
    });

app.use("/", express.static(appResources));


// Just for testing.
// This isn't good because when the connection closes, the midi callback continues
// to trigger
wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    socket.send('ho!');

    midiInput.on('noteon', function (params) {
      console.log('--- NOTE ON ' + params['note']);
      if(socket.readyState === WebSocket.OPEN){
        socket.send(JSON.stringify(params));
      };
    });

    midiInput.on('noteoff', function (params) {
      console.log('--- NOTE OFF ' + params['note']);
      if(socket.readyState === WebSocket.OPEN){
        socket.send(JSON.stringify(params));
      };
    });

});
