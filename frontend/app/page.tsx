'use client'

import { AbstractMoney } from "./_components/abstract-money"
import { AbstractSubgraphAPI } from "./_components/abstract-subgraph-api"
import { BalanceComponent } from "./_components/generated-contract-example"
import { GrazConnection } from "./_components/graz-connection"

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <GrazConnection />
      <AbstractMoney />
      <AbstractSubgraphAPI />
      <BalanceComponent address="juno1ju8k8sqwsqu5k6umrypmtyqu2wqcpnrkf4w4mntvl0javt4nma7s8lzgss" />
    </div>
  )
}
