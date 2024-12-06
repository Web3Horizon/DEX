import ERC20Abi from '$lib/constants/abi/ERC20Approve';
import { newAppError, type AppError } from '$lib/types/AppError';
import type { TokenInfo } from '$lib/types/tokens/Token';
import { ethers } from 'ethers';

export async function approveTokens(
	tokenInfo: TokenInfo,
	routerAddress: string,
	amount: string
): Promise<AppError | null> {
	if (!window.ethereum) {
		console.error('No wallet connected');
		return newAppError('MetaMask is required', null);
	}

	const provider = new ethers.BrowserProvider(window.ethereum);
	const signer = await provider.getSigner();
	const tokenContract = new ethers.Contract(tokenInfo.address, ERC20Abi, signer);

	// Convert human-readable amount to blockchain units
	const amountInBlockchainFormat = ethers.parseUnits(amount, tokenInfo.decimals);

	const allowance = await tokenContract.allowance(signer.address, routerAddress);

	console.log(allowance, amountInBlockchainFormat);
	// Check if allowance is already sufficient
	if (allowance >= amountInBlockchainFormat) return null;

	try {
		const tx = await tokenContract.approve(routerAddress, amountInBlockchainFormat, {
			gasLimit: 1000000
		});
		await tx.wait();
		console.log(`Approval successful for ${tokenInfo.address}`);

		return null;
	} catch (err: any) {
		console.error('Approval failed:', err);

		return newAppError('Failed to approve token:', err.toString());
	}
}
