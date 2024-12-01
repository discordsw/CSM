import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import CardHolder from './components/CardHolder'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="titleBar">
        Card SIM Management
      </div>
      <CardHolder/>
    </ThemeProvider>
  )
}

export default App

