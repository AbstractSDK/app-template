import { useCreateAccountMonarchy } from '@abstract-money/react';
import { useAccount as graz_useAccount } from 'graz';
import { chainNameToId } from '@abstract-money/core';

export const CreateAccount: React.FC = () => {
  const chainName = 'osmosistestnet';
  const chainId = chainNameToId(chainName);
  const { data: cosmosAccount } = graz_useAccount({ chainId });

  const { mutate: createAccount, isLoading, data: account } = useCreateAccountMonarchy({
    chainName,
  });

  console.log({
    cosmosAccount,
    account
  })

  const handleCreateAccount = async () => {
    if (!cosmosAccount) {
      console.error('No Cosmos account found');
      return;
    }

    try {
      createAccount({
        args: { name: 'My New Account', owner: cosmosAccount.bech32Address },
        fee: 'auto',
      });
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <button
      type='button'
      onClick={handleCreateAccount}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {isLoading ? 'Creating...' : 'Create Account'}
    </button>
  );
};

