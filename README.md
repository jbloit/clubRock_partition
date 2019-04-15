# WebScore

Display notes from a MIDI stream in a web browser. Notes scroll vertically and touch a play bar at the bottom of the screen when the notes should be played.

The display speed is computed such that 4 beats are displayed between the top of the screen and the playbar.

# Installation

## Requirements

- The web server is a node.js program. So, you need to install node.js
- a MIDI source: 

## Install dependencies

Make sure you have an internet connection and run:

```
cd webScore
npm install
```

# Execution

## On the server:

```
cd webScore
node index.js
```

Make sure the server islistening on the correct MIDI port. By default this is IAC Driver, Bus 1. Edit this in index.js if needed.

The current BPM is derived from a MIDI sync clock signal. In Ableton Live you can activate the Sync toggle for your MIDI source in the MIDI pane of the preferences window.

The last MIDI channel (16) is reserverd for displaying the beat markers. If you want to display them, you should send MIDI notes on this channel on every beat (or other subdivision you want to display).

## On the client(s)

Make sure the client can reach the server's IP on port 3000. 

Then open a web browser at 
```
<server IP>:3000/?channel=1
```
Change the channel parameter according to the MIDI channel you want to display. 
Channel 16 is reserved for the horizontal beat markers.
