//**************************************************//
//** Third-party package imports **//
//**************************************************//
import { ethers } from 'ethers';

//**************************************************//
//** ABI imports **//
//**************************************************//
import pairAbi from '$lib/constants/abi/DexerV2Pair';
import erc20Abi from '$lib/constants/abi/ERC20';

//**************************************************//
//** Other library imports **//
//**************************************************//
import { AppError, isAppError } from '$lib/types/AppError';
import getBrowserProvider from '$lib/scripts/helpers/getBrowserProvider';
import type { TokenInfo } from '$lib/types/tokens/Token';
import type { PooledTokenDetails, UserLiquidity } from '$lib/constants/userLiquidity';
import getPairAddress from '$lib/scripts/tokens/getPairAddress';
import getPairReserves from '$lib/scripts/tokens/getPairReserves';
import type { PairReserves } from '$lib/types/tokens/PairReserves';

const fetchUserLiquidity = async (
	token1Info: TokenInfo,
	token2Info: TokenInfo,
	factoryAddr: string
): Promise<UserLiquidity | null> => {
	try {
		const reserves: PairReserves | null = await getPairReserves(
			token1Info,
			token2Info,
			factoryAddr
		);

		if (reserves === null) return null;

		const provider: ethers.BrowserProvider = getBrowserProvider();

		const pairAddr: string = await getPairAddress(
			factoryAddr,
			token1Info.address,
			token2Info.address,
			provider
		);

		let signer: ethers.JsonRpcSigner = await provider.getSigner();
		let userAddr: string = await signer.getAddress();

		const pairContract: ethers.Contract = new ethers.Contract(pairAddr, pairAbi, provider);
		const token1Contract: ethers.Contract = new ethers.Contract(
			token1Info.address,
			erc20Abi,
			provider
		);
		const token2Contract: ethers.Contract = new ethers.Contract(
			token2Info.address,
			erc20Abi,
			provider
		);

		// Fetch reserves and total supply
		const totalSupply: bigint = await pairContract.totalSupply();

		let [token1Decimals, token2Decimals, pairTokenDecimals]: bigint[] = await Promise.all([
			token1Contract.decimals(),
			token2Contract.decimals(),
			pairContract.decimals()
		]);

		// Fetch user LP token balance
		const poolTokenBalance: bigint = await pairContract.balanceOf(userAddr);

		// Calculate pool share
		const poolShare: string = ((poolTokenBalance * 100n) / totalSupply).toString();

		// Calculate pooled amounts
		const pooledToken1AmountRaw: bigint = (reserves.reserve1 * poolTokenBalance) / totalSupply;
		const pooledToken2AmountRaw: bigint = (reserves.reserve2 * poolTokenBalance) / totalSupply;

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
};

export default fetchUserLiquidity;
