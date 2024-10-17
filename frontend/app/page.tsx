'use client'

import { CreateAbstractAccount } from "./_components/create-abstract-account"
import { QueryAbstractSubgraph } from "./_components/query-abstract-subgraph"
import { CodegenContract } from "./_components/codegen-contract"
import { WalletConnection } from "./_components/wallet-connection"

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <WalletConnection />
      <CreateAbstractAccount />
      <QueryAbstractSubgraph />
      <CodegenContract />
    </div>
  )
}
