# SteamTradeBot :fire:
This project is an opensource tradebot that should make tradebots available for everyone. If you are a big trading website, if you are a small trader in your spare time or if you are a YouTuber with lots of trade offers. This is for everyone. There are 8 simple steps to set it up, then you should be good to go. We have a UI that is lived updated with the offers received. 

#### Screenshots :camera:
<p float="left">
<img src="https://user-images.githubusercontent.com/7386785/46103266-af1be780-c1d0-11e8-8554-7a63a99bad83.PNG" width="200">
<img src="https://user-images.githubusercontent.com/7386785/46106221-754edf00-c1d8-11e8-82b3-28577aea7616.PNG" width="115">
<img src="https://user-images.githubusercontent.com/7386785/46106324-ae874f00-c1d8-11e8-9eba-89ce50846833.PNG" width="115">
</p>
Oh? You wan't more screenshots? You can find them [here]()

## Why use a steambot? :microscope:
Well, there are many reasons why you should use and develop a steambot. Maybe you have a big inventory and want to do all the trades automatic. This is where this steambot truly shines. The bot is getting the prices that are updated real-time from the steam servers. Or let's say that you want to make a trading website or a gambling website? These sites are based on steambots. But we believe in a simple solution without complicated code or logs in the console. 

## How do I set it up? :heart:
We try to focus a lot on setup and installation for the bot for the people that are not really into coding or thinks it's complicated.
Here is what you have to do:

1. Download the zip file, press on the green button that says "Clone or download" and downloads it as a .zip file. 
2. Extract the files to another location on your computer. We recommend creating a folder called "steambot" on your desktop. 
3. Install NodeJS. Nodejs is the core of this bot. You simply need it for it to work. Here is a link: https://nodejs.org/en/
4. Install Desktop Authenticator, you don't have to but if you want it AUTOMATIC this step is REQUIRED: https://github.com/Jessecar96/SteamDesktopAuthenticator
5. Find your shared secret & identity secret. Here is a video: https://www.youtube.com/watch?v=JjdOJVSZ9Mo
6. Edit the config.json. Note that set the sharedsecret & identitysecret to the one you've got from step 5. 
7. Run install.bat
8. You're all set. You now have a steambot running on your steam account! 

### Withdrawing items from your bot. :sunglasses:
If you've got the bot set to another account than your name, please fill in your Steam64ID inside the config file where ownerid is. 
(WE RECOMMEND HAVING A SEPARATE STEAM ACCOUNT FOR THE BOT AND TRADING).

### Information you may want to know
You can edit the config.json file however you want. Or at least the data inside it. You will have to set your steam username, password, sharedsecret and identity secret. In here you can also set values for the trash limit or the game that the bot is focusing on. When you successfully start the program up you can edit these values from the bar at the top. 

### UI & Graphics :boom:
We are currently working hard on an updated user-interface. Here you can change values more easily without risking to mess up something. But be careful: Changing some values like the trashlimit(for example) will make the bot act differently from default. You can read more about trashlimits here. Here are the basics that you will find when starting it up:
 - Trades today: Here you will see the number of trades that the bot has done today, shutting down the bot will make it reset, we are planning to fix this later.
 - Profit: Here you will see how much profit the bot has made. This will by default be set to 0.
 - Middle box: You may just see an empty little box under the "developed by" text. This section of the page will fill up when making trades. Here you can see the partner that you traded with and how much profit you've made. This is updated in real-time.
 - Navbar: You may have noticed that there is a navbar at the top left of the window. This is used for settings, shutting down, configs etc. You can mess around here.

### Trashlimit :shit:
Alright, no one wants to trade a 150€ knife for 400 cases. To prevent that we need to have a filter that removes or changes the value of small items like cases etc. Therefore, there is a setting for the trash limit on the skins. By default, the trashlimit is set to 0,04. Every skin that is worth 0.04 or less will be worth 0.01 instead. There will be a setting to make it worth nothing. If you don't trade with small skins then consider making this value bigger. (We recommend 1€ for really big inventories) 

### Edit & Change main.js :scroll:
If you're not an experienced developer we don't recommend changing stuff in the code. Changing stuff can make the bot act weird and maybe do bad trades or crash etc. If you are a developer the code is open source so you can easily edit whatever you want. If you make some major changes please send them to us and we will take a look at them and maybe add them to the main script. 

### Contact :books:
The owner of this project is OlleThunberg, if you want to join the project then please contact him on: olle.thunberg03@gmail.com. 
Everyone can contribute. Even if they are not part of the project. Just create an issue or a pull request and we will be sure to take a look at it. 
If you truly want to support the project then please share it. It doesn't cost you anything, but it will make us happy.
 - OlleThunberg: olle.thunberg03@gmail.com



### License
MIT
Copyright 2018 OlleThunberg

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

