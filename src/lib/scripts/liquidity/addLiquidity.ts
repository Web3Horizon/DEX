import { PUBLIC_DEXER_V2_ROUTER_ADDR, PUBLIC_SLIPPAGE_TOLERANCE } from '$env/static/public';
import dexerV2RouterAbi from '$lib/constants/abi/DexerV2Router';
import { newAppError, type AppError } from '$lib/types/AppError';
import type { TokenInfo } from '$lib/types/tokens/Token';
import { ethers } from 'ethers';

export const addLiquidity = async (
	token1Amount: number,
	token1Info: TokenInfo,
	token2Amount: number,
	token2Info: TokenInfo
): Promise<AppError | null> => {
	if (!window.ethereum) return newAppError('Metamask is required in order to add liquidity', null);

	try {
		// Connect to wallet
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();

		// Get Router Contract Instance
		const routerContract = new ethers.Contract(
			PUBLIC_DEXER_V2_ROUTER_ADDR,
			dexerV2RouterAbi,
			signer
		);

		// Convert user input to raw token amounts (on-chain representation)
		const token1RawAmount = ethers.parseUnits(token1Amount.toString(), token1Info.decimals);
		const token2RawAmount = ethers.parseUnits(token2Amount.toString(), token2Info.decimals);

		const token1MinAmount =
			token1RawAmount -
			(token1RawAmount * BigInt(Number(PUBLIC_SLIPPAGE_TOLERANCE) * 1e18)) / BigInt(1e18);
		const token2MinAmount =
			token2RawAmount -
			(token2RawAmount * BigInt(Number(PUBLIC_SLIPPAGE_TOLERANCE) * 1e18)) / BigInt(1e18);

		// Send addLiquidity transaction
		const tx = await routerContract.addLiquidity(
			token1Info.address,
			token2Info.address,
			token1RawAmount,
			token2RawAmount,
			token1MinAmount,
			token2MinAmount,
			await signer.getAddress()
		);

		// Wait for transaction to complete
		const receipt = await tx.wait();

		console.log('Liquidity added successfully:', receipt);
		alert('Liquidity added successfully!');

		return null;
	} catch (error: any) {
		console.error('Failed to add liquidity:', error);
		alert('Failed to add liquidity. See console for details.');

		return newAppError('Failed to add liquidity', error.toString());
	}
};
