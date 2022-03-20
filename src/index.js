import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import CryptoContext from './CryptoContext'

import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './index.css'
import 'react-alice-carousel/lib/alice-carousel.css'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

ReactDOM.render(
  <React.StrictMode>
    <CryptoContext>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </CryptoContext>
  </React.StrictMode>,
  document.getElementById('root')
)
