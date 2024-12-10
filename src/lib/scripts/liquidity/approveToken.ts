import { ethers } from 'ethers';
import ERC20Abi from '$lib/constants/abi/ERC20';
import { AppError, isAppError } from '$lib/types/AppError';
import type { TokenInfo } from '$lib/types/tokens/Token';
import getBrowserProvider from '$lib/scripts/helpers/getBrowserProvider';

export async function approveTokens(
	tokenInfo: TokenInfo,
	routerAddress: string,
	amount: string
): Promise<null> {
	try {
		let provider = getBrowserProvider();

		const signer = await provider.getSigner();
		const tokenContract = new ethers.Contract(tokenInfo.address, ERC20Abi, signer);

		// Convert human-readable amount to blockchain units
		const amountInBlockchainFormat = ethers.parseUnits(amount, tokenInfo.decimals);

		const allowance = await tokenContract.allowance(signer.address, routerAddress);

		// Check if allowance is already sufficient
		if (allowance >= amountInBlockchainFormat) return null;

		const tx = await tokenContract.approve(routerAddress, amountInBlockchainFormat, {
			gasLimit: 1000000
		});
		await tx.wait();

		return null;
	} catch (e: any) {
		if (isAppError(e)) {
			throw e;
		} else {
			throw new AppError('Unexpected error occured while approving token:', e.toString());
		}
	}
}
