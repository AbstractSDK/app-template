'use client'

import { GrazProvider as Provider } from 'graz'
import { testnetChains } from 'graz/chains'

import type { ComponentProps } from 'react'

export function GrazProvider(
  props: Pick<ComponentProps<typeof Provider>, 'children' | 'client'>,
) {
  return (
    <Provider
      client={props.client}
      grazOptions={{
        chains: Object.values(testnetChains),
        chainsConfig: {
          [testnetChains.osmosistestnet.chainId]: {
            gas: {
              price: '0.25',
              denom: 'uosmo',
            },
          },
          [testnetChains.neutrontestnet.chainId]: {
            gas: {
              price: '0.5',
              denom: 'untrn',
            },
          },
        },
      }}
      {...props}
    />
  )
}
