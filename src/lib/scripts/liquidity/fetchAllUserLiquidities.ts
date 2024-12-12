import { ethers } from 'ethers';
import pairAbi from '$lib/constants/abi/DexerV2Pair';
import factoryAbi from '$lib/constants/abi/DexerV2Factory';
import type { UserLiquidity } from '$lib/constants/userLiquidity';
import { AppError } from '$lib/types/AppError';
import { addressToTickerMap, availableTokens } from '$lib/constants/availableTokens';

export async function fetchAllUserLiquidity(
	factoryAddress: string,
	provider: ethers.BrowserProvider
): Promise<UserLiquidity[]> {
	try {
		const userAddress = await (await provider.getSigner()).getAddress();

		const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
		const allPairs: string[] = await factoryContract.getAllPairs();

		const results: UserLiquidity[] = [];

		for (const pairAddress of allPairs) {
			const pairContract = new ethers.Contract(pairAddress, pairAbi, provider);

			// Fetch user's LP token balance
			const userBalance = await pairContract.balanceOf(userAddress);
			const totalSupply = await pairContract.totalSupply();

			// Skip pairs where the user has no liquidity
			if (userBalance === 0n) continue;

			// Fetch token addresses and reserves
			const token0 = await pairContract.token0();
			const token1 = await pairContract.token1();
			const [reserve0, reserve1] = await pairContract.getReserves();

			// Calculate user's pool share
			const poolShare = (userBalance * 100n) / totalSupply;

			// Calculate user's pooled amounts
			const pooledToken0Amount = (reserve0 * userBalance) / totalSupply;
			const pooledToken1Amount = (reserve1 * userBalance) / totalSupply;

			results.push({
				poolTokenAmount: ethers.formatUnits(userBalance),
				poolShare: poolShare.toString(),
				token1: {
					ticker: addressToTickerMap[token0],
					pooledAmount: ethers.formatUnits(pooledToken0Amount)
				},
				token2: {
					ticker: addressToTickerMap[token1],
					pooledAmount: ethers.formatUnits(pooledToken1Amount)
				}
			});
		}

		return results;
	} catch (e: any) {
		throw new AppError('Failed to fetch user liquidities: ', e.toString());
	}
}
