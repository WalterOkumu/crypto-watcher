import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from '../Banner/Carousel'

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: '#16171a',
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    '&:hover': {
      //backgroundColor: '#131111'
      backgroundColor: 'lightgray'
    }
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: 'gold'
    }
  }
}))

const CoinsTable = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { currency, symbol } = CryptoState()

  const navigate = useNavigate()

  const classes = useStyles()

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))

    setCoins(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    ))
  }

  return (
    <Container style = {{ textAlign: 'center'}}>
      <Typography
        variant = 'h4'
        style = {{ margin: 18, fontFamily: 'Montserrat'}}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label = 'Search for Cryptocurrency..'
        variant = 'outlined'
        style = {{ marginBottom: 20, width: '100%', color: 'white' }}
        onChange = {(e) => setSearch(e.target.value)}
      />
      <TableContainer>
        {
          loading ? (
            <LinearProgress style = {{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style = {{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {
                    ['Coin', 'Price', '24h Change', 'Market Cap'].map((head, index) => (
                      <TableCell
                        style = {{
                          color: 'black',
                          fontWeight:'700',
                          fontFamily: 'Montserrat'
                        }}
                        key = {index}
                        align = {head === 'Coin' ? 'left' : 'right'}
                      >
                        {head}
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10 )
                    .map(row => {
                      const profit = row.price_change_percentage_24h > 0

                      return (
                        <TableRow
                          onClick = {() => navigate(`/coins/${row.id}`)}
                          className = {classes.row}
                          key = {row.name}
                        >
                          <TableCell
                            components = 'th'
                            scope = 'row'
                            style = {{
                              display: 'flex',
                              gap: 15
                            }}
                          >
                            <img
                              src = {row?.image}
                              alt = {row.name}
                              height = '50'
                              style = {{ marginBottom: 10}}
                            />
                            <div
                              style = {{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <span
                                style = {{
                                  textTransform: 'uppercase',
                                  fontSize: 22,
                                  color: 'white'
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style = {{ color: 'darkgrey' }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            align = 'right'
                            style = {{
                              color: 'white'
                            }}
                          >
                            {symbol} {' '}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align = 'right'
                            style = {{
                              color: profit > 0 ? 'rgb(14, 203, 129)'    : 'red',
                              fontWeight: 500
                            }}
                          >
                            {profit && '+'}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            align = 'right'
                            style = {{
                              color: 'white'
                            }}
                          >
                            {symbol} {' '}
                            {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
              </TableBody>
            </Table>
          )
        }
      </TableContainer>
      <Pagination
        style = {{
          padding: 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
        classes = {{ ul: classes.pagination }}
        count = {parseInt(handleSearch()?.length / 10)}
        onChange = {(_, value) => {
          setPage(value)
          window.scroll(0, 450)
        }}
      />
    </Container>
  )
}

export default CoinsTable