import { FormEvent } from 'react'
import { parseEther } from 'viem'
import { type BaseError, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

export function SendTransaction() {
    const {
        data: hash,
        error,  
        isPending, 
        sendTransaction 
    }  = useSendTransaction()
    const {isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({hash})

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const to = formData.get('address') as `0x${string}`
        const value = formData.get('value')  as string
        sendTransaction({to, value: parseEther(value)})
    }

    return (
        <form onSubmit={submit}>
            <input name="address" placeholder="to send" required />
            <input name="value" placeholder="value" required />
            <button 
            disabled={isPending}
            type="submit"
            >
                {isPending?'Confirming...':'Send'}
            </button>
            {hash && <div>Transaction Hash: {hash} </div>}
            {isConfirming&&<div>Waiting For confirmation...</div>}
            {isConfirmed&& <div>Transaction Confirmed</div>}
            {error && (
                <div>Error: {(error as BaseError).shortMessage || error.message}</div>
            )}
        </form>
    )
}