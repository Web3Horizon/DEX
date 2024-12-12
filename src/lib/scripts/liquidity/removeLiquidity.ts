import { AppError, isAppError } from '$lib/types/AppError';
import getBrowserProvider from '$lib/scripts/helpers/getBrowserProvider';
import { ethers } from 'ethers';
import dexerV2RouterAbi from '$lib/constants/abi/DexerV2Router';
import { PUBLIC_SLIPPAGE_TOLERANCE } from '$env/static/public';

export async function removeLiquidity(
	token1Addr: string,
	token2Addr: string,
	token1Decimals: number,
	token2Decimals: number,
	amountLPTokensRaw: number,
	amount1MinRaw: number,
	amount2MinRaw: number,
	routerAddr: string
): Promise<null> {
	try {
		const provider: ethers.BrowserProvider = getBrowserProvider();

		const signer = await provider.getSigner();

		const routerContract = new ethers.Contract(routerAddr, dexerV2RouterAbi, signer);

		const amountLP = ethers.parseUnits(amountLPTokensRaw.toString(), 18);
		const amount1Min: bigint =
			ethers.parseUnits(amount1MinRaw.toString(), token1Decimals) -
			(ethers.parseUnits(amount1MinRaw.toString(), token1Decimals) *
				BigInt(Number(PUBLIC_SLIPPAGE_TOLERANCE) * 1e18)) /
				BigInt(1e18);
		const amount2Min: bigint =
			ethers.parseUnits(amount2MinRaw.toString(), token2Decimals) -
			(ethers.parseUnits(amount2MinRaw.toString(), token2Decimals) *
				BigInt(Number(PUBLIC_SLIPPAGE_TOLERANCE) * 1e18)) /
				BigInt(1e18);

		const tx = await routerContract.removeLiquidity(
			token1Addr,
			token2Addr,
			amountLP,
			amount1Min,
			amount2Min,
			signer.address
		);

		await tx.wait();

		return null;
	} catch (error: any) {
		if (isAppError(error)) {
			throw error;
		} else {
			console.error(error);
			throw new AppError('Failed to remove liquidity: ', error.toString());
		}
	}
}
