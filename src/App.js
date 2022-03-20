import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

import './App.css'
import Header from './components/Header'
import CoinDetails from './components/Pages/CoinDetails'
import HomePage from './components/Pages/HomePage'

const useStyles = makeStyles({
  App: {
    backgroundColor: '#14161a',
    color: "white",
    minHeight: "100vh"
  },
})

const App = () => {

  const classes = useStyles()

  return (
    <div className = {classes.App}>
      <Header />
      <Routes>
        <Route exact path = '/' element = {<HomePage />} />
        <Route path = '/coins/:id' element = {<CoinDetails />} />
      </Routes>
    </div>
  )
}

export default App