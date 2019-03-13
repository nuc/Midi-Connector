# Midi Connector

![image](https://user-images.githubusercontent.com/697014/37869427-b15ffd98-2fb7-11e8-9a70-1f79a0e49b65.png)

Using your Raspberry Pi as a MIDI USB Host [is really straightforward](https://stimresp.wordpress.com/2016/02/08/using-a-raspberry-pi-as-usb-midi-host/).

But for configuring it you need either keyboard & monitor connected to the Pi, or SSH access.

This web app provides a GUI which can be used with a screen like the [Hyperpixel](https://shop.pimoroni.com/products/hyperpixel) and have your MIDI USB Host fully portable.

It includes a server part which acts as a wrapper of `aconnect` and a web app for the UI.

## Installation (on the Pi)

First install `yarn` by `sudo apt-get install yarn`.

### Install dependencies and launch the app
- `yarn install`
- `yarn start`
- Open: http://raspberrypi.local:3000/app

### Starting the server on boot

For starting the app on boot:
- `sudo npm install -g forever`
- `sudo crontab -e` and add the following line at the end of the file:
```
@reboot /usr/bin/forever start -c /usr/bin/node /home/pi/Code/midi-connector.js/server/server.js
```
Replace `/home/pi/Code/midi-connector.js/` with the path of the repo.

Restart the Pi. The app should be accessible right away under http://raspberrypi.local:3000/app.

#### Opening the web app on boot (kiosk mode)

Edit: `~/.config/lxsession/LXDE-pi/autostart` and add:
```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@point-rpi
@/usr/bin/chromium-browser --kiosk --disable-restore-session-state http://raspberrypi.local:3000/app
```
