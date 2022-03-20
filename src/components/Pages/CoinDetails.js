import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import { makeStyles } from '@mui/styles'
import CoinInfo from '../CoinInfo'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  sidebar: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey'
  }
}))

const CoinDetails = () => {

  const { id } = useParams()

  const [coin, setCoin] = useState()

  const { currency, symbol } = CryptoState()

  const classes = useStyles()

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))

    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className = {classes.container}>
      <div className = {classes.sidebar}>
        <img
          src = {coin?.image.large}
          alt = {coin?.name}
          height = '200'
          style = {{ marginBottom: 20 }}
        />
      </div>

      <CoinInfo coin = {coin} />
    </div>
  )
}

export default CoinDetails