import React, { useState } from 'react'

// Import the CoinMarketCap API client

import CoinMarketCap from 'coinmarketcap-api'

// Initialize the CoinMarketCap client with your API key
const client = new CoinMarketCap({
  key: '5b670f50-5e7c-4d2e-9281-95ffe75533b9',
})

// Define the TransferForm component
const TransferForm = () => {
  // useState hook to initialize the state object
  const [state, setState] = useState({
    bnbAmount: 0,
    publicAddress: '',
    bnbToNtr: 0,
  })

  // Define the handleChange function to update the state object
  // when the user enters their input
  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }

  // Define the handleConnect function to connect to the wallet
  const handleConnect = () => {}

  // Define the handleSend function to handle the transfer
  const handleSend = async () => {
    // Convert the BNB amount to NTR using the CoinMarketCap API
    const { data } = await client.tools.priceConversion({
      amount: state.bnbAmount,
      id: 1839, // BNB CMC ID
      convert_id: 11921, // NTR CMC ID
    })

    // Update the state object with the converted NTR value
    setState({ ...state, bnbToNtr: data.data.quote.NTR.price })

    // TODO: Implement token transfer logic
  }

  return (
    <form>
      <label>
        BNB Amount:
        <input
          type="number"
          name="bnbAmount"
          value={state.bnbAmount}
          onChange={handleChange}
        />
      </label>
      <label>
        Public Address:
        <input
          type="text"
          name="publicAddress"
          value={state.publicAddress}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={handleConnect}>
        Connect
      </button>
      <button type="button" onClick={handleSend}>
        Send
      </button>
      {state.bnbToNtr && (
        <p>
          BNB Amount ({state.bnbAmount} BNB) = {state.bnbToNtr} NTR
        </p>
      )}
    </form>
  )
}

// Define the transfer page component
const Transfer = () => {
  return (
    <div>
      <h1>Transfer</h1>
      <TransferForm />
    </div>
  )
}

export default Transfer
