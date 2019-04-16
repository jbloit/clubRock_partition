var easymidi = require('easymidi');
var midiInput = new easymidi.Input('IAC Driver Bus 1');

var inputs = easymidi.getInputs();

console.log(inputs)

