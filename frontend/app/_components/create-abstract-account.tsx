import { useCreateAccountMonarchy, useAccounts } from '@abstract-money/react';
import { useAccount as graz_useAccount } from 'graz';
import { appChain } from '../_utils/chains';

export const CreateAbstractAccount: React.FC = () => {
  const { chainName, chainId } = appChain;

  const { data: cosmosAccount } = graz_useAccount({ chainId });
  const { mutate: createAccount, isLoading: isCreating } = useCreateAccountMonarchy({
    chainName,
  });
  const { data: accounts } = useAccounts({
    args: {
      owner: cosmosAccount?.bech32Address ?? '',
      chains: [chainName],
    },
    query: {
      enabled: !!cosmosAccount?.bech32Address,
    }
  });

  const handleCreateAccount = async () => {
    if (!cosmosAccount) {
      console.error('No Cosmos account found');
      return;
    }

    try {
      createAccount({
        args: { name: 'Felipe test account', owner: cosmosAccount.bech32Address },
        fee: 'auto',
      });
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className="bg-black text-white">
      <h2 className="text-xl font-bold mb-4">Abstract Account Info</h2>
      <div className="flex flex-col gap-4">
        <button
          type='button'
          onClick={handleCreateAccount}
          disabled={isCreating}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isCreating ? 'Creating...' : 'Create Account'}
        </button>
        {accounts && accounts.length > 0 ? (
          <div className="bg-gray-800 p-3 rounded-md">
            <h3 className="font-semibold mb-2">Abstract Accounts:</h3>
            {accounts.map((account) => (
              <div key={account.seq} className="mb-2">
                <p><strong>Chain Name:</strong> {account.chainName}</p>
                <p><strong>Sequence:</strong> {account.seq}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No Abstract Accounts found.</p>
        )}
      </div>
    </div>
  );
};
