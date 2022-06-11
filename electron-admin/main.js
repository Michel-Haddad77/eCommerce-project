const { app, BrowserWindow } = require('electron')

function createWindow(){
    const win = new BrowserWindow();

    win.loadFile('./admin page/admin.html')
}

//wait for the app to be ready to launch browser window
app.whenReady().then(function(){
    createWindow()
})
