'use client'

import { useActiveWalletType, useDisconnect, useSuggestChainAndConnect, useAccount } from "graz"
import { useCallback } from "react"
import { appChain } from "../../utils/chains"
import { Button } from "../../components/button"

export const Header: React.FC = () => {
  const { disconnect } = useDisconnect()
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
    <header>
      <div className="mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Abstract Template App</h1>
        <div>
          {account ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{account.bech32Address}</span>
              <Button variant="outline" onClick={onDisconnect}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button onClick={onConnect} disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
