var express = require('express'),
    WebSocket = require('ws'),
    easymidi = require('easymidi');


var midiInput = new easymidi.Input('IAC Driver Bus 1');

// midiInput.on('noteon', function (params) {
//
//   if (params['velocity'] == 0){
//     ws.send('noteOff', params);
//   } else {
//     ws.send('noteOn', params);
//   }
// });
//
// midiInput.on('noteoff', function (params) {
//   // do something with msg
//   console.log('--- NOTE OFF ' + params['note']);
//   ws.send('noteOff', params);
// });





var appResources = __dirname + "/frontend",
    app = express(),
    server = app.listen(8081),
    wss = new WebSocket.Server({
        server: server
    });

app.use("/", express.static(appResources));

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    socket.send('ho!');

    midiInput.on('noteon', function (params) {
      console.log('--- NOTE ON ' + params['note']);
      socket.send(JSON.stringify(params));
    });

    midiInput.on('noteoff', function (params) {
      console.log('--- NOTE OFF ' + params['note']);
      socket.send(JSON.stringify(params));
    });

});
