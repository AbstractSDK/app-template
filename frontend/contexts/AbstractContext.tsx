import createContext from './createContext';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import {
  AbstractQueryClient,
  AbstractClient,
} from '@abstract-money/abstract.js';
import { useChain, useChainWallet } from '@cosmos-kit/react';

interface AbstractReturn {
  abstractQueryClient: AbstractQueryClient | undefined;
  getAbstractClient: () => Promise<AbstractClient>;
}
const [useAbstract, _AbstractProvider] = createContext<AbstractReturn>('');

const AbstractProvider: FC<PropsWithChildren> = ({ children }) => {
  const [abstractQueryClient, setAbstractQueryClient] =
    useState<AbstractQueryClient>();

  const {
    chain: { chain_id },
    getSigningCosmWasmClient,
    isWalletConnected,
    address,
  } = useChain(process.env.CHAIN_NAME || 'juno');

  useEffect(() => {
    (async function init() {
      const abstract = await AbstractQueryClient.connect(
        chain_id,
        process.env.ABSTRACT_VERSION_CONTROL!
      );
      setAbstractQueryClient(abstract);
    })();
  });

  const contextValue = useMemo<AbstractReturn>(
    () => ({
      abstractQueryClient,
      getAbstractClient: (): Promise<AbstractClient> => {
        if (!abstractQueryClient)
          throw new Error('Abstract client not connected');
        if (!isWalletConnected || !address)
          throw new Error('Wallet not connected');
        return getSigningCosmWasmClient().then((client) =>
          abstractQueryClient.connectSigningClient(client, address)
        );
      },
    }),
    [abstractQueryClient, address, getSigningCosmWasmClient, isWalletConnected]
  );

  return <_AbstractProvider value={contextValue}>{children}</_AbstractProvider>;
};

export default useAbstract;
export { AbstractProvider };
