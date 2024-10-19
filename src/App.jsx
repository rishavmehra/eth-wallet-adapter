import { useState } from 'react'
import './App.css'
import { useAccount, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './config'
import { WalletOptions } from './wallet-options'
import { Account } from './account'

const queryClient = new QueryClient()


function ConnectWallet(){
  const{isConnected}= useAccount()
  if (isConnected) return <Account/>
  
  return <WalletOptions/>
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}  >
        <ConnectWallet/>
      </QueryClientProvider>
    </WagmiProvider>
  
  )
}

export default App
