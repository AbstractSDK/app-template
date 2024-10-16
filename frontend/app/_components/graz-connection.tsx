import { useActiveWalletType, useChainInfos, useDisconnect, useSuggestChainAndConnect } from 'graz'
import { useCallback } from 'react'
import { appChains } from '../_constants/chains';

export const ConnectWallet: React.FC = () => {
  const chainsIds = Object.values(appChains).map((chain) => chain.chainId)

  const { disconnect } = useDisconnect();
  const { suggestAndConnect: connect, isLoading } = useSuggestChainAndConnect()

  const chains = useChainInfos({ chainId: chainsIds })
  const walletType = useActiveWalletType()

  const onClick = useCallback(() => {
    if (!chains || !walletType) return

    chains.map((chain) => {
      connect({
        chainInfo: chain,
        walletType: walletType.walletType,
      })
    })
  }, [connect, chains, walletType])

  return (
    <div className='flex gap-2'>
      <button
        type='button'
        onClick={onClick}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </button>
      <button
        type='button'
        onClick={() => disconnect({ chainId: chainsIds })}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Disconnect
      </button>
    </div>
  )
}
