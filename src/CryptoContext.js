import React, { createContext, useContext, useState, useEffect } from 'react'

const Crypto = createContext()

const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState('USD')
  const [symbol, setSymbol] = useState('$')

  useEffect(() => {

    if (currency === 'ZAR') {
      setSymbol('ZAR')
    }
    else if (currency === 'EUR') {
      setSymbol('EUR')
    }
    else if (currency === 'GBP') {
      setSymbol('GBP')
    }
    else if (currency === 'USD') {
      setSymbol('$')
    }

  }, [currency])

  return (
    <Crypto.Provider value = {{currency, symbol, setCurrency}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const  CryptoState = () => {
  return useContext(Crypto)
}