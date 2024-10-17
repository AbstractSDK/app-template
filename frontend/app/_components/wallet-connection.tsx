'use client'

import { useActiveWalletType, useDisconnect, useSuggestChainAndConnect, useAccount } from "graz"
import { useCallback } from "react"
import { appChain } from "../../utils/chains"
import { Button } from "../../components/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/card"

export const WalletConnection: React.FC = () => {
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
    <Card>
      <CardHeader>
        <CardTitle>Wallet Connection Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button onClick={onConnect} disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </Button>
            <Button variant="destructive" onClick={onDisconnect}>
              Disconnect
            </Button>
          </div>
          {account && (
            <div className="bg-gray-100 p-3 rounded-md">
              <h3 className="font-semibold mb-2">Connected Wallet Info:</h3>
              <p>
                <strong>Address:</strong> {account.bech32Address}
              </p>
              <p>
                <strong>Wallet Type:</strong> {walletType?.walletType}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}