import Wallet from '@binance-chain/javascript-wallet-sdk'

const TransferForm = () => {
  // Use the useState hook to initialize the state object
  const [state, setState] = useState({
    bnbAmount: 0,
    publicAddress: '',
    bnbToNtr: 0,
    wallet: null,
  })

  // Define the handleChange function to update the state object
  // when the user enters their input
  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }

  // Define the handleConnect function to connect to the wallet
  const handleConnect = async () => {
    // Initialize the wallet with the mnemonic and chain id
    const wallet = await Wallet.init({
      mnemonic: 'YOUR_MNEMONIC',
      chainId: 'YOUR_CHAIN_ID',
    })

    // Update the state object with the wallet instance
    setState({ ...state, wallet })
  }

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

    // Use the wallet instance to send the tokens
    await state.wallet.transfer({
      to: state.publicAddress,
      symbol: 'BNB',
      amount: state.bnbAmount,
    })
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
