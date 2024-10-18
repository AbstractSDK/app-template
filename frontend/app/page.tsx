'use client'

import { CreateAbstractAccount } from "./_components/create-abstract-account"
import { QueryAbstractSubgraph } from "./_components/query-abstract-subgraph"
import { CodegenContract } from "./_components/codegen-contract"
import { WalletConnection } from "./_components/wallet-connection"

export default function Home() {
  return (
    <div className="h-full w-full p-4 text-black space-y-4">
      <WalletConnection />
      <div className="flex flex-col gap-6">
        <CreateAbstractAccount />
        <QueryAbstractSubgraph />
        <CodegenContract />
      </div>
    </div>
  )
}