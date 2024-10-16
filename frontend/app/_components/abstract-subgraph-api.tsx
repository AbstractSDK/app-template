import { useAccount } from 'graz';
import { useAccountsMetadataGraphQLQuery } from '../_hooks/useQueryAccountsById';
import { appChains } from '../_constants/chains';
import { useAccounts } from '@abstract-money/react';

export const AbstractSubgraphAPI: React.FC = () => {
  const chainId = appChains.osmosistestnet.chainId;
  const { data: cosmosAccount } = useAccount({ chainId });
  const { data: accounts } = useAccounts({
    args: {
      owner: cosmosAccount?.bech32Address ?? '',
      chains: [appChains.osmosistestnet.chainName],
    },
    query: {
      enabled: !!cosmosAccount?.bech32Address,
    }
  });

  const { data: accountsMetadata, isLoading } = useAccountsMetadataGraphQLQuery({ accountIds: accounts });

  return (
    <div className="bg-black text-white">
      <h2 className="text-xl font-bold mb-4">Abstract Account Details</h2>
      <div className="flex flex-col gap-4">
        {isLoading && <p>Loading account details...</p>}
        {accountsMetadata && accountsMetadata.length > 0 ? (
          <div className="bg-gray-800 p-3 rounded-md">
            <h3 className="font-semibold mb-2">Account Information:</h3>
            {accountsMetadata.map((account) => (
              <div key={account.id} className="mb-4">
                <p><strong>ID:</strong> {account.id}</p>
                <p><strong>Name:</strong> {account.info.name}</p>
                <p><strong>Chain ID:</strong> {account.info.chainId}</p>
                <p><strong>Description:</strong> {account.info.description || 'N/A'}</p>
                <p><strong>Link:</strong> {account.info.link || 'N/A'}</p>
                <p><strong>Proxy:</strong> {account.proxy}</p>
                <p><strong>Manager:</strong> {account.manager}</p>
                <p><strong>Owner:</strong> {account.owner}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No Abstract Accounts found or not connected.</p>
        )}
      </div>
    </div>
  );
};
