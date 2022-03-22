import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { HistoricalChart } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import { makeStyles } from '@mui/styles'
import { CircularProgress } from '@mui/material'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import SelectButton from '../SelectButton'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding: 20,
      paddingTop: 0
    }
  }
}))

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState([])
  const [days, setDays] = useState(1)

  const { currency } = CryptoState()

  const classes = useStyles()

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

    setHistoricalData(data?.prices)
  }

  useEffect(() => {
    fetchHistoricalData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency])

  const checkMinutes = (minutes) => {
    if (minutes < 10) {
      return '0' + minutes
    } else {
      return minutes
    }
  }

  const labelList = [
    historicalData?.map((coin) => {
      let date = new Date(coin[0])

      let time = date.getHours() > 12
        ? `${date.getHours() - 12}:${checkMinutes(date.getMinutes())} PM`
        : `${date.getHours()}:${checkMinutes(date.getMinutes())} AM`

      return days === 1 ? time : date.toLocaleDateString()
    })
  ]

  let data = {
    labels: labelList[0],
    datasets: [{
      label: `Price ( Past ${days} Days ) in ${currency}`,
      data: historicalData?.map((coin) => coin[1]),
      borderColor: '#EEBC1D',
      borderWidth: 1
    }]
  };

  let options = {
    responsive: true,
    elements: {
      point: {
        radius: 1
      }
    },
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    }
  ]

  return (
    <div className = {classes.container}>
      {/* chart */}
      {
        !historicalData ? (
          <CircularProgress
            style = {{ color: 'gold' }}
            size = {250}
            thickness = {1}
          />
        ) : (
          <Line options={options} data={data}  />
        )
      }
      {/* buttons */}
      <div
        style = {{
          display: 'flex',
          marginTop: 20,
          justifyContent: 'space-around',
          width: '100%'
        }}
      >
      {
        chartDays.map((day, index) => (
          <SelectButton
            key = {index}
            onClick = {() => setDays(day.value)}
            selected = {day.value === days}
          >
            {day.label}
          </SelectButton>
        ))
      }
      </div>
    </div>
  )
}

export default CoinInfo