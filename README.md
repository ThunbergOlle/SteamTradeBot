# SteamTradeBot :fire:
This is an accessible open-source steam tradebot for everyone to enjoy. 
**Want a custom bot designed for your needs? Contact olle.thunberg03@gmail.com for more info**

#### Screenshots :camera:
<p float="left">
<img src="https://user-images.githubusercontent.com/7386785/46103266-af1be780-c1d0-11e8-8554-7a63a99bad83.PNG" width="200">
<img src="https://user-images.githubusercontent.com/7386785/46106221-754edf00-c1d8-11e8-82b3-28577aea7616.PNG" width="115">
<img src="https://user-images.githubusercontent.com/7386785/46106324-ae874f00-c1d8-11e8-9eba-89ce50846833.PNG" width="115">
</p>

## How do I set it up? :heart:

1. Press on the green button that says "Clone or download" and download it as a .zip file. 
2. Extract the files somewhere on your computer. We recommend creating a folder called "steambot" on your desktop. 
3. Install NodeJS. NodeJS is the core of this bot. It's required for it to work. https://nodejs.org/en/
4. Install Desktop Authenticator, it's optional but if you want it to work automatically this step is REQUIRED: https://github.com/Jessecar96/SteamDesktopAuthenticator
5. Find your shared secret & identity secret. [Tutorial](https://www.youtube.com/watch?v=JjdOJVSZ9Mo)
6. Edit `config.json`. You have to set the shared secret & identity secret to the one you've got from step 5. 
7. Run `install.bat`
8. You're all set. You now have a Steam bot running on your Steam account! 

### Withdrawing items from your bot. :sunglasses:
If you've got the bot set to another account than your name, please fill in your Steam64ID inside the config file where ownerid is. 
(WE RECOMMEND HAVING A SEPARATE STEAM ACCOUNT FOR THE BOT AND TRADING).

### UI & Graphics :boom:
We are currently working hard on an updated user-interface. Here you can change values more easily without risking to mess up something. But be careful: Changing some values (e.g. the trashlimit) will make the bot act differently from default. You can read more about trashlimits here. Here are the basics that you will find when starting it up:
 - Trades today: Here you will see the number of trades that the bot has done today, shutting down the bot will make it reset, we are planning to fix this later.
 - Profit: Here you will see how much profit the bot has made. This will by default be set to 0.
 - Middle box: You may just see an empty little box under the "developed by" text. This section of the page will fill up when making trades. Here you can see the partner that you traded with and how much profit you've made. This is updated in real-time.
 - Navbar: You may have noticed that there is a navbar at the top left of the window. This is used for settings, shutting down, configs etc. You can mess around here.

### Trashlimit :shit:
No one wants to trade a 150€ knife for 400 cases. To prevent that we need to have a filter that removes or changes the value of small items like cases etc. Therefore, there is a setting for the trash limit on the skins. By default, the trashlimit is set to 0,04. Every skin that is worth 0.04 or less will be worth 0.01 instead.. If you don't trade with small skins then consider increasing this value. (I recommend 1€ for really big inventories) 

### Edit & Change main.js :scroll:
If you're not an experienced developer, then do not change the code of the files. Changing files may make the bot act weird and maybe do bad trades or crash etc. If you make some major changes feel free to submit a pull request!

### Contact :books:
The owner of this project is Olle Thunberg, if you want to join the project then please contact him.
Everyone can contribute, even if they are not part of the project. Just create an issue or a pull request and we will be sure to take a look at it. 
If you truly want to support the project then please share it. It doesn't cost you anything, but it will make us happy.
 - OlleThunberg: olle.thunberg03@gmail.com


