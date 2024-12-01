import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import fs from 'fs'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

//const isProd = process.env.NODE_ENV === 'production';
const isProd = false
const baseDir = isProd ? process.resourcesPath : path.resolve(__dirname, '../../src/main');

const filePath = path.join(baseDir, 'config.json');

function initializeJsonFile() {
  if (!fs.existsSync(filePath)) {
    const defaultData = {}
    for(let i = 1; i <= 12; i++) {
      defaultData[`place${i}`] = {
        id: `${i}`,
        type: "empty",
        model: "",
        operator: "",
        SIM: "",
        line: "",
        PIN: "",
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    console.log('Fichier JSON créé avec des données par défaut.');
  } else {
    console.log('Fichier JSON existe déjà.');
  }
}

function readJsonFile() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 60
    },
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  initializeJsonFile()

  ipcMain.handle('get-json-data', () => readJsonFile())
  //const jsonData = readJsonFile()

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
