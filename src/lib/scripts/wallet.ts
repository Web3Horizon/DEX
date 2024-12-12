import { ethers } from 'ethers';
import { walletConnected } from '$lib/stores/wallet';
import { AppError } from '$lib/types/AppError';
import getBrowserProvider from './helpers/getBrowserProvider';

export async function connectWallet(): Promise<null | AppError> {
	try {
		// This line ensures that 'window.ethereum' exsists and
		// returns browser provider (MetaMask)
		const provider: ethers.BrowserProvider = getBrowserProvider();

		// Restore connection from localStorage if exists
		const previouslyConnectedAddress = localStorage.getItem('connectedWalletAddress');
		if (previouslyConnectedAddress) {
			const signer: ethers.JsonRpcSigner = await provider.getSigner();

			if (signer.address === previouslyConnectedAddress) {
				setupAccountChangeListener();
				walletConnected.set(true);
				return null;
			}
		}

		// Request account access if not already connected
		await window.ethereum!.request({ method: 'eth_requestAccounts' });

		const signer: ethers.JsonRpcSigner = await provider.getSigner();

		// Save connected wallet address
		localStorage.setItem('connectedWalletAddress', signer.address);
		walletConnected.set(true);

		// Set up listener for account changes
		let listenerSetupResult = setupAccountChangeListener();

		if (listenerSetupResult != null) {
			return listenerSetupResult;
		}

		return null;
	} catch (err: any) {
		console.error(err);
		return new AppError('Error connecting wallet', err.toString());
	}
}

export function disconnectWallet(): void {
	localStorage.removeItem('connectedWalletAddress');
	walletConnected.set(false);
}

// Listen for account changes
function setupAccountChangeListener(): null | AppError {
	if (!window.ethereum) {
		return new AppError('MetaMask is required to setup an account listener', null);
	}

	window.ethereum.on('accountsChanged', (accounts: string[] | unknown) => {
		// Ensure accounts is of type string[]
		if (Array.isArray(accounts)) {
			if (accounts.length === 0) {
				// No accounts connected
				disconnectWallet();
				return;
			} else {
				// Update to new account
				const newAddress = accounts[0];
				localStorage.setItem('connectedWalletAddress', newAddress);
				walletConnected.set(true);
				return;
			}
		} else {
			console.error('Unexpected accountsChanged parameter:', accounts);
		}
	});

	return null;
}
