import { useActiveWalletType, useChainInfos, useSuggestChainAndConnect } from 'graz'
import { useCallback } from 'react'

export const ConnectWallet: React.FC = () => {
  const { suggestAndConnect: connect, isLoading } = useSuggestChainAndConnect()
  const chains = useChainInfos({ chainId: ['osmo-test-5'] })
  const walletType = useActiveWalletType()


  const onClick = useCallback(() => {

    console.log(chains)
    console.log(walletType)

    if (!chains || !walletType) return

    chains.map((chain) => {
      connect({
        chainInfo: chain,
        walletType: walletType.walletType,
      })
    })
  }, [connect, chains, walletType])

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
