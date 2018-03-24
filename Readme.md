# Midi Connector

![image](https://user-images.githubusercontent.com/697014/37869427-b15ffd98-2fb7-11e8-9a70-1f79a0e49b65.png)

Using your Raspberry Pi as a MIDI USB Host [is really straightforward](https://stimresp.wordpress.com/2016/02/08/using-a-raspberry-pi-as-usb-midi-host/). But for configuring it you need either keyboard & monitor connected to the Pi, or SSH access.

This web app provides a GUI which can be used with a screen like the [Hyperpixel](https://shop.pimoroni.com/products/hyperpixel) and have your MIDI USB Host fully portable.

It's a small Node.js server which acts as a wrapper of `aconnect` and a React app for the UI.

Quite barebones, but it works! :)

## Installation (on the Pi)

First install `yarn` by `sudo apt-get install yarn`.

### Node.js Server
- `cd server`
- `yarn install`

For running the server on boot:
- `sudo npm install -g forever`
- `sudo crontab -e` and add the following line at the end of the file:
```
@reboot /usr/bin/forever start -c /usr/bin/node /home/pi/Code/midi-connector.js/server/server.js
```
Replace `/home/pi/Code/midi-connector.js/` with the path of the repo.

Restart the Pi. The server should be accessible under http://raspberrypi.local:3000.

### Client

You would need to build the client's assets and serve them on the Pi. I'm using nginx for serving the static assets, but ideally the bundled web app could be served from the node server.

- `cd client`
- `yarn install`
- `yarn build`

Install nginx with:
- `sudo apt-get install nginx`

Edit the config:

- `sudo vi /etc/nginx/sites-enabled/default` and update the contents with:

```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /home/pi/Code/midi-connector.js/client/dist;

	index index.html;

	server_name _;

	location / {
		try_files $uri $uri/ =404;
	}

}
```

- Again, replace `/home/pi/Code/midi-connector.js/` with the right path.
- Launch nginx: `sudo service start nginx`.
- Open: http://raspberrypi.local/

In case bonjour doesn't work for you, replace `raspberrypi.local` with the IP address of your Pi.

### For launching the webapp on boot

Edit: `~/.config/lxsession/LXDE-pi/autostart` and add:
```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@point-rpi
@/usr/bin/chromium-browser --kiosk --disable-restore-session-state http://raspberrypi.local/
```
