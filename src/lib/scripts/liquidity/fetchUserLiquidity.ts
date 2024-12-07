//**************************************************//
//** Third-party package imports **//
//**************************************************//
import { ethers } from 'ethers';

//**************************************************//
//** ABI imports **//
//**************************************************//
import factoryAbi from '$lib/constants/abi/DexerV2Factory';
import pairAbi from '$lib/constants/abi/DexerV2Pair';
import erc20Abi from '$lib/constants/abi/ERC20Approve';

//**************************************************//
//** Other library imports **//
//**************************************************//
import { AppError, isAppError } from '$lib/types/AppError';
import getBrowserProvider from '$lib/scripts/helpers/getBrowserProvider';
import type { TokenInfo } from '$lib/types/tokens/Token';
import type { PooledTokenDetails, UserLiquidity } from '$lib/constants/userLiquidity';

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
	token1Info: TokenInfo,
	token2Info: TokenInfo
): Promise<UserLiquidity | null> {
	try {
		const provider = getBrowserProvider();

		// Fetch pair address
		const pairAddr = await getPairAddress(
			factoryAddr,
			token1Info.address,
			token2Info.address,
			provider
		);

		// Check if the pair exists
		if (pairAddr === ethers.ZeroAddress) {
			return null; // If no pair exsists = no pool exists
		}

		let signer = await provider.getSigner();
		let userAddr = await signer.getAddress();

		const pairContract = new ethers.Contract(pairAddr, pairAbi, provider);
		const token1Contract = new ethers.Contract(token1Info.address, erc20Abi, provider);
		const token2Contract = new ethers.Contract(token2Info.address, erc20Abi, provider);
		//

		// Fetch reserves and total supply
		const [reserve0, reserve1]: bigint[] = await pairContract.getReserves();
		const totalSupply: bigint = await pairContract.totalSupply();

		let [token1Decimals, token2Decimals, pairTokenDecimals] = await Promise.all([
			token1Contract.decimals(),
			token2Contract.decimals(),
			pairContract.decimals()
		]);

		// Fetch user LP token balance
		const poolTokenBalance: bigint = await pairContract.balanceOf(userAddr);

		// Calculate pool share
		const poolShare = ((poolTokenBalance * 100n) / totalSupply).toString();

		// Calculate pooled amounts
		const pooledToken1AmountRaw: bigint = (reserve0 * poolTokenBalance) / totalSupply;
		const pooledToken2AmountRaw: bigint = (reserve1 * poolTokenBalance) / totalSupply;

		// Format pooled token amounts
		let pooledToken1Amount: string = ethers.formatUnits(pooledToken1AmountRaw, token1Decimals);
		let pooledToken2Amount: string = ethers.formatUnits(pooledToken2AmountRaw, token2Decimals);

		const token1: PooledTokenDetails = {
			ticker: token1Info.ticker,
			pooledAmount: pooledToken1Amount
		};
		const token2: PooledTokenDetails = {
			ticker: token2Info.ticker,
			pooledAmount: pooledToken2Amount
		};

		return {
			poolTokenAmount: ethers.formatUnits(poolTokenBalance, pairTokenDecimals),
			poolShare: poolShare,
			token1,
			token2
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
