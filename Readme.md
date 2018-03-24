# midi-connector.js

![image](https://user-images.githubusercontent.com/697014/37869268-d7053b60-2fb4-11e8-86d9-792af696a91f.png)


## Installation

### Client

- `cd client`
- `yarn`
- `yarn build`

Serve static assets via nginx:

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

### Server
- `cd server`
- `yarn`
- `sudo npm install -g forever`
- `sudo crontab -e` and then add:
```
@reboot /usr/bin/forever start -c /usr/bin/node /home/pi/Code/midi-connector.js/server/server.js
```

### For launching the webapp on boot
Add `~/.config/lxsession/LXDE-pi/autostart`:
```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@point-rpi
@/usr/bin/chromium-browser --kiosk --disable-restore-session-state http://raspberrypi.local/
```

	
