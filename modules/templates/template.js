const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path'); //Module for path finding inside the project.

module.exports = mainMenuTemplate = [{

    label: 'File',
    submenu: [
      {
        label: 'Pause'
      },
      {
        label: 'Exit',
        click: function () {
          app.quit();
        }
      }
    ],
  },
  {
    label: 'Config',
    submenu: [
      {
        label: 'Account',
        click: function () {
          smallwin = new BrowserWindow({ width: 350, height: 450 });
          smallwin.loadURL(url.format({
            pathname: path.join(process.cwd() + '/WebPage/configs/configAccount.html'),
            protocol: 'file',
            slashes: true,
          }));
          smallwin.setMenu(null);
        }
      },
      {
        label: 'Games',
        click: function () { //This handles when the label is clicked.
          smallwin = new BrowserWindow({ width: 350, height: 300 });
          smallwin.loadURL(url.format({
            pathname: path.join(process.cwd() + '/WebPage/configs/configGames.html'),
            protocol: 'file',
            slashes: true,
          }));
          smallwin.setMenu(null);
        }
      },
      {
        label: 'Trashlimit',
        click: function () {//This handles when the label is clicked.
          smallwin = new BrowserWindow({ width: 350, height: 300 });
          smallwin.loadURL(url.format({
            pathname: path.join(process.cwd() + '/WebPage/configs/configTrash.html'),
            protocol: 'file',
            slashes: true
          }));
          smallwin.setMenu(null);
        }
      },
      {
        label: 'OwnerID',
        click: function () { //This handles when the label is clicked.
          smallwin = new BrowserWindow({ width: 350, height: 300 });
          smallwin.loadURL(url.format({
            pathname: path.join(process.cwd() + '/WebPage/configs/configOwnerID.html'),
            protocol: 'file',
            slashes: true,
          }));
          smallwin.setMenu(null);
        }
      },
      {
        label: 'Secrets',
        click: function () {
          smallwin = new BrowserWindow({ width: 350, height: 450 });
          smallwin.loadURL(url.format({
            pathname: path.join(process.cwd() + '/WebPage/configs/secrets.html'),
            protocol: 'file',
            slashes: true,
          }));
          smallwin.setMenu(null);
        }
      }
    ]
  },
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Preferences',
      },
      {
        label: 'Privacy'
      },
      {
        label: 'Connection'
      }
    ]
  
  },
  {
    label: 'Stats',
    submenu: [
      {
        label: 'Overview',
        click: function () {
          smallwin = new BrowserWindow({ width: 1000, height: 1000 });
          smallwin.loadURL(url.format({
            pathname: path.join(process.cwd() + '/WebPage/stats/overview.html'),
            protocol: 'file',
            slashes: true,
          }));
          smallwin.setMenu(null);
        },
      }
    ]
  
  }
  
  ];