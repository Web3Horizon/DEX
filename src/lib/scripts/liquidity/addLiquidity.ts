import { PUBLIC_DEXER_V2_ROUTER_ADDR, PUBLIC_SLIPPAGE_TOLERANCE } from '$env/static/public';
import dexerV2RouterAbi from '$lib/constants/abi/DexerV2Router';
import { AppError, isAppError } from '$lib/types/AppError';
import type { TokenInfo } from '$lib/types/tokens/Token';
import { ethers } from 'ethers';
import getBrowserProvider from '../helpers/getBrowserProvider';
import sortTokens from '../tokens/sortTokens';

export const addLiquidity = async (
	token1Amount: number,
	token1Info: TokenInfo,
	token2Amount: number,
	token2Info: TokenInfo
): Promise<null> => {
	try {
		let provider = getBrowserProvider();
		const signer = await provider.getSigner();

		// Get Router Contract Instance
		const routerContract = new ethers.Contract(
			PUBLIC_DEXER_V2_ROUTER_ADDR,
			dexerV2RouterAbi,
			signer
		);

		// Convert user input to raw token amounts (on-chain representation)
		let token1RawAmount: bigint = ethers.parseUnits(token1Amount.toString(), token1Info.decimals);
		let token2RawAmount: bigint = ethers.parseUnits(token2Amount.toString(), token2Info.decimals);

		let token1MinAmount: bigint =
			token1RawAmount -
			(token1RawAmount * BigInt(Number(PUBLIC_SLIPPAGE_TOLERANCE) * 1e18)) / BigInt(1e18);
		let token2MinAmount: bigint =
			token2RawAmount -
			(token2RawAmount * BigInt(Number(PUBLIC_SLIPPAGE_TOLERANCE) * 1e18)) / BigInt(1e18);

		const [sortedToken0, _] = sortTokens(token1Info.address, token2Info.address);

		if (sortedToken0 === token2Info.address) {
			[token1Amount, token2Amount] = [token2Amount, token1Amount];
			[token1Info, token2Info] = [token2Info, token1Info];
			[token1MinAmount, token2MinAmount] = [token2MinAmount, token1MinAmount];
			[token1RawAmount, token2RawAmount] = [token2RawAmount, token1RawAmount];
		}

		const tx = await routerContract.addLiquidity(
			token1Info.address,
			token2Info.address,
			token1RawAmount,
			token2RawAmount,
			token1MinAmount,
			token2MinAmount,
			signer.address
		);

		// Wait for transaction to complete
		await tx.wait();

		return null;
	} catch (e: any) {
		if (isAppError(e)) {
			throw e;
		} else {
			console.error(e);
			throw new AppError('Unexpected error occured while adding liquidity:', null);
		}
	}
};
