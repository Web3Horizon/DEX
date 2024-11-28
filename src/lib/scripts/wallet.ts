import { ethers } from 'ethers';
import { walletConnected } from '$lib/stores/wallet';
import { newAppError, type AppError } from '$lib/types/AppError';

export async function connectWallet(): Promise<null | AppError> {
	if (!window.ethereum) {
		return newAppError('MetaMask is required to connect a wallet', null);
	}

	try {
		const provider = new ethers.BrowserProvider(window.ethereum);

		// Restore connection from localStorage if exists
		const previouslyConnectedAddress = localStorage.getItem('connectedWalletAddress');
		if (previouslyConnectedAddress) {
			const signer: ethers.JsonRpcSigner = await provider.getSigner();
			const address: string = signer.address;

			if (address === previouslyConnectedAddress) {
				setupAccountChangeListener();
				walletConnected.set(true);
				return null;
			}
		}

		// Request account access if not already connected
		await window.ethereum.request({ method: 'eth_requestAccounts' });

		const signer: ethers.JsonRpcSigner = await provider.getSigner();
		const address: string = signer.address;

		// Save connected wallet address
		localStorage.setItem('connectedWalletAddress', address);
		walletConnected.set(true);

		// Set up listener for account changes
		let listenerSetupResult = setupAccountChangeListener();

		if (listenerSetupResult != null) {
			return listenerSetupResult;
		}

		return null;
	} catch (err: any) {
		return newAppError('Error connecting wallet', err.toString());
	}
}

export function disconnectWallet(): void {
	localStorage.removeItem('connectedWalletAddress');
	walletConnected.set(false);
}

// Listen for account changes
function setupAccountChangeListener(): null | AppError {
	if (!window.ethereum) {
		return newAppError('MetaMask is required to setup an account listener', null);
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
