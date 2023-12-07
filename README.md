# CMPEN 482W FA23 Capstone Project

## Penn State Engineering Leadership Develpment- Electronic Agile Workshop Game

## Before following any of the steps below, ensure you are connected to psu_guest wifi
Even if it looks like you are on the wifi, you must ensure you are connected to it, otherwise some of the major functionalities listed below may not work.
1. Click on the wifi symbol in the top right.
2. If it is not already checked, click on the psu_guest wifi and connect to it.
3. If a popup appears, follow the necessary steps to get connected to the wifi.\
   ___If the wifi is checked and you did not see the popup, follow these next few steps___
4. Open up the browser and search up an http website (http://httpforever.com/)
5. If you were not connected to the wifi before, you will see the popup. Follow the steps on the popup to connect to the wifi.
6. If you see the content on the page, you are already connected to the wifi.

## Getting started on a new Raspberry Pi
1. First, go to https://nodejs.org/en and install the latest version of node.
2. Then, go to https://www.python.org/ and install the latest version of python.
3. Next open the command line and enter the following:\
    ```
    pip install --user RPi.GPIO
    pip install --user Flask
    pip install --user Flask-CORS
    ```
    ___This will install the necessary Python dependencies.___
4. To clone the repository, open the command line, navigate to your intended directory and run the following command:\
``` git clone https://github.com/andrew-ho7705/agile-game.git && npm install ```\
___This will clone the source code and install the necessary npm dependencies.___

At this point, if the new Raspberry Pi has not been set up to run the game upon startup yet, run the command:\
```npm start```\
to run the game.

## To set up your Raspberry Pi to run Agile Aces on startup
1. Open your terminal and enter the following command:\
   ```sudo nano /etc/systemd/system/agile-game.service```
2. This will open a new, empty .service file. Within this file, copy and paste the following in:                      

```[Unit]
Description=Agile Game npm start
After=network.target

[Service]
Type=simple
ExecStart=/home/pi/.config/nvm/versions/node/v18.17.0/bin/npm start
WorkingDirectory=/home/pi/agile-game
Restart=on-failure
User=pi
Group=pi
Environment="DISPLAY=:O"
Environment="XAUTHORITY=/home/pi/Xauthority"

[Install]
WantedBy=multi-user.target
```
\
***NOTICE:*** This should have no problem running, but if the game stops running in the backround on startup, open up the command line and enter:\
```run npm install npm@latest -g```\
This will get the latest version of node on the system. Now enter in:\
```node -v```\
Copy this value, renavigate to the agile-game.service file with:\
```sudo nano /etc/systemd/system/agile-game.service```\
and replace the old version with the one you have copied.
\
3. Press Control + o to save, press enter, then Control + x to exit the file. From now on, the game should start in the background on Raspberry Pi startup.\
***I have found it convenient to add the game to the browser's bookmarks tab for quicker access***

# To install screensharing application (for laptops)
1. Go to https://anydesk.com/en/downloads/ and select Raspberry Pi for the Pi and the correct one for the respective laptop.
2. Install the application and open it on both devices.
3. In the top left corner of the AnyDesk application on the laptop, enter in the 9-10 digit number displayed on the Pi.
4. Press enter and you should have full access to the mouse with the laptop's keyboard and the ability to listen to audio from the Pi on your laptop.

# Help/Support
If there are ever any issues with any of the software aspects of thsi game, please email me at andrewh6591@gmail.com and I will be happy to help. 

## Acknowledgements

We would like to extend our heartfelt thanks to our esteemed sponsor, Paul Mittan, the Director of Engineering Leadership Development at Penn State. His generous support and guidance have been invaluable to the success of our project. His commitment to fostering leadership and development in the field of engineering has greatly inspired our team and contributed significantly to the progress and achievements of our project.

Thank you, Paul Mittan, for your unwavering support and belief in our work.
