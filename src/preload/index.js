import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getJsonData: () => ipcRenderer.invoke('get-json-data'),
  updateJsonData: (newData) => ipcRenderer.invoke('update-json-data', newData),
  sendCardAction: (action, cardDetails) => {
    ipcRenderer.send('card-action', {action, cardDetails})
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI,
      ...api
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = {
    ...electronAPI,
    ...api
  }
}
