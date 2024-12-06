import { ethers } from 'ethers';
import { AppError } from '$lib/types/AppError';

const getBrowserProvider = (): ethers.BrowserProvider => {
	if (!window.ethereum) throw new AppError('MetaMask is required', null);

	return new ethers.BrowserProvider(window.ethereum);
};

export default getBrowserProvider;
