import { useActiveWalletType, useDisconnect, useSuggestChainAndConnect, useAccount } from 'graz'
import { useCallback } from 'react'
import { appChain } from '../_utils/chains';

export const GrazConnection: React.FC = () => {
  const { disconnect } = useDisconnect();
  const { suggestAndConnect: connect, isLoading } = useSuggestChainAndConnect()
  const { data: account } = useAccount()
  const walletType = useActiveWalletType()

  const onConnect = useCallback(() => {
    if (!walletType) return

    connect({
      chainInfo: appChain,
      walletType: walletType.walletType,
    })
  }, [connect, walletType])

  const onDisconnect = useCallback(() => {
    disconnect({ chainId: appChain.chainId })
  }, [disconnect])

  return (
    <div className="bg-black">
      <h2 className="text-xl font-bold mb-4">Wallet Connection</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onConnect}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
          <button
            type="button"
            onClick={onDisconnect}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Disconnect
          </button>
        </div>
        {account && (
          <div className="bg-gray-800 p-3 rounded-md">
            <h3 className="font-semibold mb-2">Connected Wallet Info:</h3>
            <p><strong>Address:</strong> {account.bech32Address}</p>
            <p><strong>Wallet Type:</strong> {walletType?.walletType}</p>
          </div>
        )}
      </div>
    </div>
  )
}
