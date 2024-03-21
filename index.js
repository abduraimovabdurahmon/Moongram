const { app, BrowserWindow } = require('electron');
const { Notification } = require('electron');

let xato = false;
let script;


const createWindow = async () => {

    // create window
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        autoHideMenuBar: true,
        icon: __dirname + "/icon.ico",
    });

    // maximize window
    win.maximize();

    // set title
    win.title = "Moongram";


    // open browser
    win.loadURL('https://web.telegram.org/k/');

    // change window title
    win.on('page-title-updated', (e, title) => {
        e.preventDefault();
        win.title = "Moongram";
    });


    // show notification
    new Notification({
        title: "Moongram",
        body: "Moongram ishga tushdi!"
    }).show()


    // fetch script
    try {
        script = await fetch("https://raw.githubusercontent.com/abduraimovabdurahmon/telegram-media-downloader/main/script.js")
            .then(res => res.text())


        setTimeout(() => {
            new Notification({
                title: "Moongram",
                body: "Script yuklandi!"
            }).show();
        }
            , 2000);

    } catch (error) {
        xato = true
        setTimeout(() => {
            new Notification({
                title: "Moongram",
                body: "Script yuklanmadi!"
            }).show();
        }
            , 2000);
    }

    // inject script
    win.webContents.executeJavaScript(script);


    setTimeout(() => {
        if (xato) return

        new Notification({
            title: "Moongram",
            body: "Dastur to'liq ishga tushdi🥳🥳🥳",
            closeButtonText: "Yopish"
        }).show();
    }, 5000);


    // author
    setTimeout(() => {
        new Notification({
            title: "Moongram",
            body: "Created by Abdurakhmon",
            closeButtonText: "Yopish"
        }).show();
    }, 8000);



    // change placeholder
    win.webContents.executeJavaScript(`
        const myInterval = setInterval(() => {

            if(document.querySelector(".input-search-placeholder").innerText.includes("Created by Abdurakhmon")){
                clearInterval(myInterval);
            }

            if(document.querySelector(".input-search-placeholder")){
                document.querySelector(".input-search-placeholder").innerText = "Created by Abdurakhmon";
                document.querySelector(".input-search-placeholder").style.color = "#36ba01"
            }

        }, 1000);
    `);



}

app.whenReady().then(createWindow);