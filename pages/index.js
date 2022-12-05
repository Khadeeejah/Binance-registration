import Image from 'next/image'
import RegistrationForm from '../components/RegistrationForm/RegistrationForm'
// Import the CoinMarketCap API client
import CoinMarketCap from 'coinmarketcap-api'

import styles from '../styles/Home.module.css'
// import Navbar from '../components/Navbar/Navbar'
import '@rainbow-me/rainbowkit/styles.css'
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

// / Initialize the CoinMarketCap client with your API key
const client = new CoinMarketCap({
  key: '5b670f50-5e7c-4d2e-9281-95ffe75533b9',
})

export default function IndexPage() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div className={styles.title}>
            <ConnectButton />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>

      <div className={styles.main}>
        {/* <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
        </div> */}
        <div>
          <Image
            className={styles.image}
            alt=" logo"
            src="/picture.svg"
            width={500}
            height={500}
          />
        </div>
        <RegistrationForm />
      </div>
    </>
  )
}
