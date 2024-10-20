import { http, createConfig } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { injected, metaMask, safe } from 'wagmi/connectors'


// const projectId = 'a2f9b78924b72a4259f13480ef2a10a0'


export const config = createConfig({
    chains: [mainnet],
    connectors: [
        injected(),
        // walletConnect({ projectId }),
        metaMask(),
        safe(),
    ],
    transports:{
        [mainnet.id]: http(),
        [base.id]: http(),
    }
})
