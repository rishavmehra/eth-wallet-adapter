import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, WagmiProvider } from 'wagmi'
import { config } from './config'
import { Account } from './account'
import { WalletOptions } from './wallet-options'
import { SendTransaction } from './send-transaction'
import { ReadContract } from './read-contract'

const queryClient = new QueryClient()


// function ConnectWallet() {
//   const { isConnected } = useAccount()
//   return isConnected ? <Account /> : <WalletOptions />
// }

function ConnectWallet() {
  const { isConnected } = useAccount()

  return (
    <>
      {isConnected ? (
        <>
          <Account />
          <ReadContract /> {/* This will render only when wallet is connected */}
        </>
      ) : (
        <WalletOptions />
      )}
    </>
  )
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <ConnectWallet />
        <SendTransaction/>
      </QueryClientProvider> 
    </WagmiProvider>
  )
}

