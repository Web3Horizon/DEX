import { ethers } from 'ethers';
import getBrowserProvider from '$lib/scripts/helpers/getBrowserProvider';

import DexerV2RouterAbi from '$lib/constants/abi/DexerV2Router';
import { AppError, isAppError } from '$lib/types/AppError';
import { PUBLIC_DEXER_V2_ROUTER_ADDR } from '$env/static/public';
import type { TokenInfo } from '$lib/types/tokens/Token';

/**
 * Swaps tokens using the router contract.
 * @param routerAddress Address of the router contract.
 * @param amountIn Input token amount.
 * @param amountOutMin Minimum output token amount.
 * @param path Token addresses for the swap path.
 * @param recipient Address to receive the output tokens.
 */
export const swapTokens = async (
	routerAddress: string,
	amountIn: number,
	token1Info: TokenInfo,
	path: string[]
) => {
	try {
		const provider = getBrowserProvider();
		const signer = await provider.getSigner();
		const addr = await signer.getAddress();

		let amountsOut = await getSwapAmountsOut(
			PUBLIC_DEXER_V2_ROUTER_ADDR,
			amountIn,
			token1Info,
			path
		);

		const routerContract = new ethers.Contract(routerAddress, DexerV2RouterAbi, signer);
		const amountInRaw = ethers.parseUnits(amountIn.toString(), token1Info.decimals);

		const tx = await routerContract.swapExactTokensForTokens(
			amountInRaw,
			amountsOut[1],
			path,
			addr,
			{
				gasLimit: 1000000
			}
		);

		await tx.wait();

		const hash: string = tx.hash;

		return hash;
	} catch (error: any) {
		if (isAppError(error)) {
			throw error;
		} else {
			throw new AppError('Swap failed', error.toString());
		}
	}
};

export const getSwapAmountsOut = async (
	routerAddress: string,
	amountIn: number,
	token1Info: TokenInfo,
	path: string[]
): Promise<ethers.Numeric[]> => {
	try {
		const provider = getBrowserProvider();
		const signer = await provider.getSigner();

		const routerContract = new ethers.Contract(routerAddress, DexerV2RouterAbi, signer);

		const amountInRaw = ethers.parseUnits(amountIn.toString(), token1Info.decimals);

		const amountsOut = await routerContract.getAmountsOut(amountInRaw, path);

		return amountsOut;
	} catch (error: any) {
		throw new AppError('Failed to fetch swap amounts', error.toString());
	}
};
