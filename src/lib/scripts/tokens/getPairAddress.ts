import { ethers } from 'ethers';
import factoryAbi from '$lib/constants/abi/DexerV2Factory';

const getPairAddress = async (
	factoryAddress: string,
	token1Addr: string,
	token2Addr: string,
	provider: ethers.Provider
): Promise<string> => {
	const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
	return await factoryContract.pairs(token1Addr, token2Addr);
};

export default getPairAddress;
