# install Raspbian GNU/Linux 10 (buster) lite
# install stuff
```
sudo apt install -y nginx-full git python3-venv chromium-browser xserver-xorg x11-xserver-utils xinit openbox fortunes-bofh-excuses
```

# git clone
```
git clone URL
```

# copy contents of autostart file to 
```
sudo cp -f autostart /etc/xdg/openbox/autostart
```

# disable cursor, enabled autologin, and set the background to solid black
```
cp -f bash_profile ~/.bash_profile
touch ~/.hushlogin
sudo cp -f autologin.conf /etc/systemd/system/getty@tty1.service.d/autologin.conf
cp -f desktop-items-0.conf ~/.config/pcmanfm/LXDE-pi/desktop-items-0.conf
```

# disable the splash screen, and rotate the display
```
echo "disable_splash=1" |sudo tee -a /boot/config.txt
echo "display_hdmi_rotate=3" |sudo tee -a /boot/config.txt
echo "disable_overscan=1" |sudo tee -a /boot/config.txt
```
# copy webserver contents
```
sudo cp -f html/* /var/www/html/
sudo chmod -R 755 /var/www/html/
```

# update config.js
# Generate an API key for weather api [here](https://www.weatherapi.com/).
# Generate an API key from google cloud console [here](https://console.cloud.google.com). You'll also need to enable the Google Calendar API.
# NOTE: this is insecure way of doing api keys, but since it's just a webserver hosted for a local system dashboard, we're doing this to keep complexity low.
```
echo 'var API_KEY = "WEATHERAPIKEY";' | sudo tee /var/www/html/js/config.js
echo 'var ZIP_CODE = "ZIPCODEHERE";' | sudo tee /var/www/html/js/config.js
echo 'var GOOGLE_KEY = "GOOGLEAPIKEY";' | sudo tee /var/www/html/js/config.js
```

# reboot
```
sudo reboot
```