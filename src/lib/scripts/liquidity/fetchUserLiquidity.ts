// import { ethers } from 'ethers';
// import factoryAbi from '$lib/constants/abi/DexerV2Factory';
// import { AppError, isAppError } from '$lib/types/AppError';
// import getBrowserProvider from '../helpers/getBrowserProvider';

// export async function getPairAddress(
// 	factoryAddress: string,
// 	token1Addr: string,
// 	token2Addr: string,
// 	provider: ethers.Provider
// ): Promise<string> {
// 	const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
// 	return await factoryContract.pairs(token1Addr, token2Addr);
// }

// export async function fetchUserLiquidity(
// 	factoryAddr: string,
// 	token1Addr: string,
// 	token2Addr: string
// ): Promise<null> {
// 	try {
// 		let provider = getBrowserProvider();

// 		// Fetch address of the selected pair contract
// 		const pairAddr = await getPairAddress(factoryAddr, token1Addr, token2Addr, provider);

// 		if (pairAddr === ethers.ZeroAddress) {
// 			// If no pair address exists just return
// 			// Default user liquidity data will be represented
// 			return null;
// 		}

// 		// TODO: Fetch user liquidity

// 		// TODO: return actual user liquidity data

// 		// NOTE: temporary!
// 		return null;
// 	} catch (e: any) {
// 		if (isAppError(e)) {
// 			throw e;
// 		} else {
// 			throw new AppError(
// 				'Unexpected error occured while fetching user liquidity data:',
// 				e.toString()
// 			);
// 		}
// 	}
// }

import { ethers } from 'ethers';
import factoryAbi from '$lib/constants/abi/DexerV2Factory';
import pairAbi from '$lib/constants/abi/DexerV2Pair';
import erc20Abi from '$lib/constants/abi/ERC20Approve'; // ERC20 ABI

import { AppError, isAppError } from '$lib/types/AppError';
import getBrowserProvider from '../helpers/getBrowserProvider';

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
): Promise<{
	poolTokenBalance: string;
	pooledToken1: string;
	pooledToken2: string;
	poolShare: string;
} | null> {
	console.log('hello');
	try {
		const provider = getBrowserProvider();

		// Fetch pair address
		const pairAddr = await getPairAddress(factoryAddr, token1Addr, token2Addr, provider);

		// Check if the pair exists
		if (pairAddr === ethers.ZeroAddress) {
			return null; // No pool exists
		}

		let signer = await provider.getSigner();
		let userAddr = await signer.getAddress();

		const pairContract = new ethers.Contract(pairAddr, pairAbi, provider);
		const token1Contract = new ethers.Contract(token1Addr, erc20Abi, provider);
		const token2Contract = new ethers.Contract(token2Addr, erc20Abi, provider);

		// Fetch reserves and total supply
		const [reserve0, reserve1] = await pairContract.getReserves();
		const totalSupply = await pairContract.totalSupply();

		// Fetch user LP token balance
		const poolTokenBalance = await pairContract.balanceOf(userAddr);

		// Calculate pool share
		const poolShare = (poolTokenBalance * 100n) / totalSupply;
		const poolShareFormatted = Number(poolShare).toFixed(2);

		// Calculate pooled amounts
		const pooledToken1 = (reserve0 * poolTokenBalance) / totalSupply;
		const pooledToken2 = (reserve1 * poolTokenBalance) / totalSupply;

		// Convert to number for formatting

		// Return poolShare as a string with a "%" appended
		return {
			poolTokenBalance: ethers.formatUnits(poolTokenBalance, 18),
			pooledToken1: ethers.formatUnits(pooledToken1, await token1Contract.decimals()),
			pooledToken2: ethers.formatUnits(pooledToken2, await token2Contract.decimals()),
			poolShare: poolShareFormatted
		};
	} catch (error: any) {
		if (isAppError(error)) {
			throw error;
		} else {
			throw new AppError(
				'Unexpected error occurred while fetching user liquidity data:',
				error.toString()
			);
		}
	}
}
