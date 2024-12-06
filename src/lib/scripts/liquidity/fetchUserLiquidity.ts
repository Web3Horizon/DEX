import { ethers } from 'ethers';
import factoryAbi from '$lib/constants/abi/DexerV2Factory';

export async function getPairAddress(
	factoryAddress: string,
	token1Addr: string,
	token2Addr: string,
	provider: ethers.Provider
): Promise<string> {
	const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
	return await factoryContract.pairs(token1Addr, token2Addr);
}

export async function fetchUserLiquidity(
	factoryAddr: string,
	token1Addr: string,
	token2Addr: string
): Promise<boolean | null> {
	// TODO: return AppError with the message
	if (!window.ethereum) return false;

	// Get provider from Metamask wallet
	const provider = new ethers.BrowserProvider(window.ethereum);

	// Fetch address of the selected pair contract
	const pairAddr = await getPairAddress(factoryAddr, token1Addr, token2Addr, provider);

	console.log(pairAddr);

	// If no pair address exists just return
	// Default user liquidity data will be represented
	if (pairAddr === ethers.ZeroAddress) {
		console.log('The selected token pair contract does not exist');
		return null;
	}
	// TODO: Fetch user liquidity

	// TODO: return actual user liquidity data
	return true;
}
