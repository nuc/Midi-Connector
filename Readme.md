Add `~/.config/lxsession/LXDE-pi/autostart`:
```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@point-rpi
@/usr/bin/chromium-browser --kiosk --disable-restore-session-state http://raspberrypi.local/
```

And `sudo crontab -e`:
```
@reboot /usr/bin/forever start -c /usr/bin/node /home/pi/Code/midi-connector.js/server/server.js
```

And then in nginx:
```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /home/pi/Code/midi-connector.js/client/dist;

	# Add index.php to the list if you are using PHP
	index index.html;

	server_name _;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
	}

}
```	
