//**************************************************//
//** Package imports **//
//**************************************************//
import { ethers } from 'ethers';

//**************************************************//
//** Library imports **//
//**************************************************//
import { AppError } from '$lib/types/AppError';
import type { PairReserves } from '$lib/types/tokens/PairReserves';
import type { TokenInfo } from '$lib/types/tokens/Token';
import getBrowserProvider from '$lib/scripts/helpers/getBrowserProvider';
import getPairAddress from '$lib/scripts/tokens/getPairAddress';
import pairAbi from '$lib/constants/abi/DexerV2Pair';

const getPairReserves = async (
	token1Info: TokenInfo,
	token2Info: TokenInfo,
	factoryAddr: string
): Promise<PairReserves | null> => {
	try {
		const provider: ethers.BrowserProvider = getBrowserProvider();

		const pairAddr: string = await getPairAddress(
			factoryAddr,
			token1Info.address,
			token2Info.address,
			provider
		);

		// Check if the pair exists
		if (pairAddr === ethers.ZeroAddress) {
			return null; // If no pair exsists = no pool exists
		}

		const pairContract: ethers.Contract = new ethers.Contract(pairAddr, pairAbi, provider);

		const [reserve1, reserve2]: bigint[] = await pairContract.getReserves();

		return { reserve1, reserve2 };
	} catch (e: any) {
		throw new AppError('Failed to fetch pair reserves.', e.toString());
	}
};

export default getPairReserves;
