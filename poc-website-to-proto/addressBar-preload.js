const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  goToCurrentUrl: (currentUrl) => ipcRenderer.send('set-currentUrl', currentUrl),
  updateCurrentUrl: (fn) => ipcRenderer.on('update-currentUrl', fn),
  takeView: () => ipcRenderer.send('new-view'),
});
