import React from 'react'
import { makeStyles } from '@mui/styles'
import { Container, Typography } from '@mui/material'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: 'url(./banner2.jpg)'
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around'
  },
  tagline: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  }
}))

const Banner = () => {
  const classes = useStyles()

  return (
    <div className = {classes.banner}>
      <Container className = {classes.bannerContent}>
        <div className = {classes.tagline}>
          <Typography
            variant = 'h2'
            style = {{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Montserrat'
            }}
          >
            Crypto Watcher
          </Typography>
          <Typography
            variant = 'subtitle2'
            style = {{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat'
            }}
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner