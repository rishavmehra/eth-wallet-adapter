import { useReadContract } from 'wagmi'
import { abi } from './abi'
import { BaseError } from 'viem'

export function ReadContract() {
    const { data: balance, error,  isPending } = useReadContract({
        abi,
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        functionName: 'balanceOf', 
        args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
    })
    if (isPending) return <div>Loading...</div>

    if (error)
    return (
        <div>
        Error: {(error as BaseError).shortMessage || error.message}
        </div>
    )

    return (
        <div>Balance: {balance?.toString()}</div>
    )

}

