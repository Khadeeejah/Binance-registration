// register.js

import RegistrationForm from '../components/RegistrationForm/RegistrationForm'
// Import the CoinMarketCap API client
// import CoinMarketCap from 'coinmarketcap-api'

// Initialize the CoinMarketCap client with your API key
const client = new CoinMarketCap({
  key: 'YOUR_API_KEY',
})

// Define the register page component
const Register = () => {
  return (
    <div>
      <h1>Registration</h1>
      <RegistrationForm />
    </div>
  )
}

export default Register
