import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import { Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CryptoState } from '../CryptoContext'

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}))

const Header = () => {
  const classes = useStyles()

  const navigate = useNavigate()

  const { currency, setCurrency } = CryptoState()

  return (
    <AppBar color = 'transparent' position = 'static'>
      <Container>
        <Toolbar>
          <Typography
            className = {classes.title}
            onClick = {() => navigate('/')}
            variant = 'h6'
          >
            Crypto Watcher
          </Typography>
          <Select
            variant = 'outlined'
            style = {{
              width: 100,
              height: 40,
              marginRight: 15,
              backgroundColor: 'white'
            }}
            value = {currency}
            onChange = {(e) => setCurrency(e.target.value)}
          >
            <MenuItem value = {'ZAR'}>ZAR</MenuItem>
            <MenuItem value = {'EUR'}>EUR</MenuItem>
            <MenuItem value = {'GBP'}>GBP</MenuItem>
            <MenuItem value = {'USD'}>USD</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header