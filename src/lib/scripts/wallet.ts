import { ethers } from 'ethers';
import { walletConnected } from '$lib/stores/wallet';

export async function connectWallet(): Promise<void> {
	if (!window.ethereum) {
		alert('MetaMask is required to connect a wallet.');
		return;
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
				return;
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
		setupAccountChangeListener();
	} catch (error) {
		console.error('Error connecting wallet:', error);
	}
}

export function disconnectWallet(): void {
	localStorage.removeItem('connectedWalletAddress');
	walletConnected.set(false);
}

// Listen for account changes
function setupAccountChangeListener(): void {
	if (!window.ethereum) {
		alert('MetaMask is required to setup an account listener.');
		return;
	}

	window.ethereum.on('accountsChanged', (accounts: string[] | unknown) => {
		// Ensure accounts is of type string[]
		if (Array.isArray(accounts)) {
			if (accounts.length === 0) {
				// No accounts connected
				disconnectWallet();
			} else {
				// Update to new account
				const newAddress = accounts[0];
				localStorage.setItem('connectedWalletAddress', newAddress);
				walletConnected.set(true);
			}
		} else {
			console.error('Unexpected accountsChanged parameter:', accounts);
		}
	});
}
