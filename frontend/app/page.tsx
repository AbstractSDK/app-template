'use client'

import { CreateAbstractAccount } from "./_components/create-abstract-account"
import { QueryAbstractSubgraph } from "./_components/query-abstract-subgraph"
import { CodegenContract } from "./_components/codegen-contract"
import { WalletConnection } from "./_components/wallet-connection"

export default function Home() {
  return (
    <div className="w-full p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-6">Abstract Account App</h1>
      <div className="flex flex-col gap-6">
        <WalletConnection />
        <CreateAbstractAccount />
        <QueryAbstractSubgraph />
        <CodegenContract />
      </div>
    </div>
  )
}