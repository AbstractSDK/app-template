'use client'

import { CreateAccount } from "./_components/create-account"
import { ConnectWallet } from "./_components/connect-wallet"

export default function Home() {
  return (
    <div>
      <ConnectWallet />
      <CreateAccount />
    </div>
  )
}
