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
import sortTokens from '$lib/scripts/tokens/sortTokens';

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

		if (pairAddr === ethers.ZeroAddress) {
			return null;
		}

		const pairContract: ethers.Contract = new ethers.Contract(pairAddr, pairAbi, provider);

		const reserves: bigint[] = await pairContract.getReserves();

		// Determine token order using sortTokens
		const [sortedToken0, _] = sortTokens(token1Info.address, token2Info.address);

		// Flip reserves if tokens are in the reverse order
		if (token1Info.address === sortedToken0) {
			return { reserve1: reserves[0], reserve2: reserves[1] };
		} else {
			return { reserve1: reserves[1], reserve2: reserves[0] };
		}
	} catch (e: any) {
		throw new AppError('Failed to fetch pair reserves.', e.toString());
	}
};

export default getPairReserves;
