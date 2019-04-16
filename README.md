# WebScore

Display notes from a MIDI stream in a web browser. Notes scroll vertically and touch a play bar at the bottom of the screen when the notes should be played.

The display speed is computed such that 4 beats are displayed between the top of the screen and the playbar.

# Installation

## Requirements

- The web server is a node.js program. So, you need to install node.js
- a MIDI source (could be a hardware controller, or a DAW etc...)

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

Make sure the server is listening on the correct MIDI port. By default this is IAC Driver, Bus 1. Edit this in index.js if needed.

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

# Setup @LaPetiteFabrique

## Server 

Machine = Lenovo T410, Windows 7
Installed:
- Saved this repository to Users\User\Documents\webScore
- AbletonLive
- Node.js
Npm Install complained so I installed:
- Python 2.7 (ticked all options in the installer, including adding python.exe to the PATH)
- Visual Studio Express 2013 (as recommended in [this article](https://blog.lesieur.name/installer-tous-les-modules-npm-node-js-sous-windows/) ) 
*~4GB to download... be patient*

- [loopMIDI](https://www.tobias-erichsen.de/software/loopmidi.html)




## Clients

- RPI 3B+
- OS: raspbian
- HDMI to VGA adapters

### Config

- for the HDMI to VGA adapter: 

In */boot/config.txt*, uncomment the following:
```
hdmi_safe=1
hdmi_force_hotplug=1
```

- for launching the chromium browser when the RaspberryPi is booted:

edit */etc/xdg/lxsession/LXDE-pi/autostart* (set the channel number between 1 and 4, corresponding to the screen index to be displayed).

```
@xset s off
@xset -dpms
@xset s noblank

@chromium-browser --noerrdialogs --kiosk localhost:3000/?channel=1
```
