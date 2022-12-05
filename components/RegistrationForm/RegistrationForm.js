import React, { useState } from 'react'

// Define the RegistrationForm component
const RegistrationForm = () => {
  // Use the useState hook to initialize the state object
  const [state, setState] = useState({
    address: '',
    bnbFee: 0,
    ntrFee: 0,
  })

  // Define the handleChange function to update the state object
  // when the user enters their input
  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }

  // Define the handleSubmit function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Convert the BNB fee to NTR using the CoinMarketCap API
    const { data } = await client.tools.priceConversion({
      amount: state.bnbFee,
      id: 1839, // BNB CMC ID
      convert_id: 11921, // NTR CMC ID
    })

    // Update the state object with the converted NTR value
    setState({ ...state, ntrFee: data.data.quote.NTR.price })
  }

  return (
    <div className="container">
      <h1> Registration</h1>
      <form onSubmit={handleSubmit}>
        <label className="Name">
          Address:
          <input
            type="text"
            name="name"
            value={state.address}
            onChange={handleChange}
          />
        </label>

        <label>
          BNB Fee:
          <input
            type="number"
            name="bnbFee"
            value={state.bnbFee}
            onChange={handleChange}
          />
        </label>
        <button className="submit" type="submit">
          Submit
        </button>
        {state.ntrFee && (
          <p>
            BNB Fee ({state.bnbFee} BNB) = {state.ntrFee} NTR
          </p>
        )}
      </form>
    </div>
  )
}

export default RegistrationForm
