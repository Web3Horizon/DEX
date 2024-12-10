import { ethers } from 'ethers';
import type { TokenInfo } from '$lib/types/tokens/Token';
import getBrowserProvider from '$lib/scripts/helpers/getBrowserProvider';
import ERC20Abi from '$lib/constants/abi/ERC20';

/**
 * Fetches the balance of a specific token for the connected user.
 *
 * @param tokenInfo - Information about the token (address, decimals, etc.)
 * @returns The user's balance of the token formatted as a string or null if unable to fetch.
 */
const getUserBalance = async (tokenInfo: TokenInfo): Promise<string | null> => {
	try {
		const provider: ethers.BrowserProvider = getBrowserProvider();

		const signer: ethers.JsonRpcSigner = await provider.getSigner();

		const userAddr: string = await signer.getAddress();

		const tokenContract: ethers.Contract = new ethers.Contract(
			tokenInfo.address,
			ERC20Abi,
			provider
		);

		// Fetch the balance and decimals
		const [rawBalance, decimals] = await Promise.all([
			tokenContract.balanceOf(userAddr),
			tokenContract.decimals()
		]);

		// Format the balance
		const formattedBalance: string = ethers.formatUnits(rawBalance, decimals);

		return formattedBalance;
	} catch (error: any) {
		console.error('Error fetching user balance:', error);
		return null;
	}
};

export default getUserBalance;
