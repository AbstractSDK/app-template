'use client'

import { AccountInfo } from "./_components/account-info"
import { CreateAccount } from "./_components/create-aa"
import { ConnectWallet } from "./_components/graz-connection"

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <ConnectWallet />
      <CreateAccount />
      <AccountInfo />
    </div>
  )
}
