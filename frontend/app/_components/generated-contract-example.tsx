import { cw20Base } from '../_generated/generated-abstract';
import { useAccounts } from '@abstract-money/react';
import { useAccount } from 'graz';
import { useAccountsMetadataGraphQLQuery } from '../_hooks/useQueryAccountsById';
import { appChain } from '../_utils/chains';

export function useGetBalance(ownerAddress: string, contractAddress: string) {
  const { data: balance } = cw20Base.queries.useBalance({
    contractAddress,
    args: { address: ownerAddress },
    options: { enabled: !!ownerAddress && !!contractAddress }
  });

  console.log({ balance });
}

export const BalanceComponent: React.FC = () => {
  const contractAddress = "juno1ju8k8sqwsqu5k6umrypmtyqu2wqcpnrkf4w4mntvl0javt4nma7s8lzgss";
  const chainId = appChain.chainId;

  const { data: cosmosAccount } = useAccount({ chainId });
  const { data: accounts } = useAccounts({
    args: {
      owner: cosmosAccount?.bech32Address ?? '',
      chains: [appChain.chainName],
    },
    query: {
      enabled: !!cosmosAccount?.bech32Address,
    }
  });

  const { data: accountsMetadata } = useAccountsMetadataGraphQLQuery({ accountIds: accounts });

  useGetBalance(accountsMetadata?.[0].proxy ?? '', contractAddress);

  return (
    <div>
      <h2>Balance for address: {accountsMetadata?.[0].proxy ?? ''}</h2>
      <p>Check the console for the balance information.</p>
    </div>
  );
};


