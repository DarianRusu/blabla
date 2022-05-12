const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  addView: (fn) => ipcRenderer.on('add-view', fn),
});
