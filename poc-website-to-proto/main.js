const { app, BrowserWindow, BrowserView, ipcMain } = require("electron");
const fs = require("fs");

const path = require("path");

const WIDTH = 1024;
const HEIGHT = 768;

const LEFT_PANEL_WIDTH = 500;
const ADDRESS_BAR_HEIGHT = 50;

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
    webPreferences: {
      devTools: false,
      webSecurity: false,
    },
  });

  const leftPanel = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, "./leftPanel-preload.js"),
      devTools: true,
      webSecurity: false,
    },
  });
  mainWindow.addBrowserView(leftPanel);
  leftPanel.setBounds({ x: 0, y: 0, width: LEFT_PANEL_WIDTH, height: HEIGHT });
  leftPanel.webContents.loadFile("leftPanel.html");

  const addressBar = new BrowserView({
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, "./addressBar-preload.js"),
    },
  });
  mainWindow.addBrowserView(addressBar);
  addressBar.setBounds({
    x: LEFT_PANEL_WIDTH,
    y: 0,
    width: WIDTH - LEFT_PANEL_WIDTH,
    height: ADDRESS_BAR_HEIGHT,
  });
  addressBar.webContents.loadFile("addressBar.html");

  const browser = new BrowserView({
    webPreferences: {
      devTools: true,
    },
  });
  mainWindow.addBrowserView(browser);
  browser.setBounds({
    x: LEFT_PANEL_WIDTH,
    y: ADDRESS_BAR_HEIGHT,
    width: WIDTH - LEFT_PANEL_WIDTH,
    height: HEIGHT,
  });
  browser.webContents.loadURL("https://electronjs.org");
  browser.webContents
    .executeJavaScript(
      'document.querySelector("header").append(document.createElement("p").innerHTML="Coucou")'
    )
    .then(console.log);

  ipcMain.on("set-currentUrl", (_event, currentUrl) => {
    browser.webContents.loadURL(currentUrl);
  });

  browser.webContents.on("did-navigate", (_, url) => {
    addressBar.webContents.send("update-currentUrl", url);
  });

  browser.webContents.on("did-navigate-in-page", (_, url) => {
    addressBar.webContents.send("update-currentUrl", url);
  });

  browser.webContents.debugger.attach("1.3");
  const { targetInfos: targets } =
    await browser.webContents.debugger.sendCommand("Target.getTargets");
  const targetId = targets.find((target) => target.attached)?.targetId;
  const sessionId = await browser.webContents.debugger.sendCommand(
    "Target.attachToTarget",
    { targetId }
  );
  ipcMain.on("new-view", async (_event) => {
    const pageHeight = await browser.webContents.executeJavaScript(
      `Math.max(
        document.body.scrollHeight, 
        document.body.clientHeight, 
        document.body.offsetHeight, 
        document.documentElement.scrollHeight, 
        document.documentElement.offsetHeight, 
        document.documentElement.clientHeight
      )`
    );
    browser.webContents.debugger
      .sendCommand(
        "Page.captureScreenshot",
        {
          format: "png",
          clip: {
            x: 0,
            y: 0,
            width: WIDTH - LEFT_PANEL_WIDTH,
            height: pageHeight,
            scale: 1,
          },
          captureBeyondViewport: true,
          fromSurface: true,
        },
        sessionId
      )
      .then(({ data }) => {
        leftPanel.webContents.send("add-view", {
          ratio: (WIDTH - LEFT_PANEL_WIDTH) / pageHeight,
          data: `data:image/png;base64,${data}`,
        });
      })
      .catch((error) => console.log("WOOPS", error));
  });

  app.on("window-all-closed", () => {
    mainWindow.removeBrowserView(addressBar);
    mainWindow.removeBrowserView(browser);
    mainWindow.removeBrowserView(leftPanel);
    app.quit();
  });
}

app.whenReady().then(() => {
  createWindow();
});
