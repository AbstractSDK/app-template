'use client'

import { AbstractMoney } from "./_components/abstract-money"
import { AbstractSubgraphAPI } from "./_components/abstract-subgraph-api"
import { GrazConnection } from "./_components/graz-connection"

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <GrazConnection />
      <AbstractMoney />
      <AbstractSubgraphAPI />
    </div>
  )
}
