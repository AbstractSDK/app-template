
import { CosmWasmClient } from "@abstract-money/cli/cosmjs";
import { chainNameToId } from "@abstract-money/core";
import { mainnetChains } from "graz/chains";


export function getCosmWasmClientQueryKey(chainName: string) {
	return ["cosmWasmClient", chainName];
}

export async function getCosmWasmClient(chainName: string) {
	const endpoint = mainnetChains[chainName as keyof typeof mainnetChains].rpc;
	if (!endpoint) {
		throw new Error(`No endpoint found for ${chainName}`);
	}
	const client = await CosmWasmClient.connect(endpoint);
	const chainId = await client.getChainId();
	console.debug("Retrieved chain ID", chainId, chainName);
	if (chainNameToId(chainName) !== chainId) {
		throw new Error(
			`Expected client for ${chainNameToId(chainName)}, got ${chainId} instead`,
		);
	}
	return client;
}

export const cosmWasmClientQueryOptions = (chainName: string) => ({
	queryKey: getCosmWasmClientQueryKey(chainName),
	queryFn: async () => {
		return await getCosmWasmClient(chainName);
	},
});
