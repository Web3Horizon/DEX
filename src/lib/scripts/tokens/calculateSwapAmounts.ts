import { ethers } from 'ethers';
import DexerV2RouterAbi from '$lib/constants/abi/DexerV2Router';
import getBrowserProvider from '$lib/scripts/helpers/getBrowserProvider';
import { AppError } from '$lib/types/AppError';

/**
 * Calculate the swap amounts using the router contract
 * @param routerAddress The address of the DexerV2Router contract
 * @param amountIn The amount of the input token
 * @param path The array of token addresses representing the swap path
 * @returns An array of token amounts at each stage of the swap
 */
export const calculateSwapAmounts = async (
	routerAddress: string,
	amountIn: string,
	path: string[]
): Promise<number[]> => {
	const provider = getBrowserProvider();
	const routerContract = new ethers.Contract(routerAddress, DexerV2RouterAbi, provider);

	try {
		const amountsOut = await routerContract.getAmountsOut(amountIn, path);

		return amountsOut.map((amount: ethers.Numeric) => Number(ethers.formatUnits(amount, 18)));
	} catch (error: any) {
		throw new AppError('Failed to calculate swap amounts.', error.toString());
	}
};
