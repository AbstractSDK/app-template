import { useAccounts } from '@abstract-money/react';
import { appChains } from '../_constants/chains';
import { useAccount as graz_useAccount } from 'graz';

export const AccountInfo: React.FC = () => {
  const { data: cosmosAccount } = graz_useAccount({ chainId: appChains.osmosistestnet.chainId });
  const { data: accounts } = useAccounts({
    args: {
      owner: cosmosAccount?.bech32Address ?? '',
      chains: [appChains.osmosistestnet.chainName],
    }
  });

  return (
    <div>
      {accounts?.map((account) => (
        <div key={account.seq}>
          <p>Name: {account.chainName}</p>
          <p>Seq: {account.seq}</p>
        </div>
      ))}
    </div>
  )
}