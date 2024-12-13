import type { TokenInfo } from '$lib/types/tokens/Token';
import { getPairReserves } from '$lib/scripts/tokens/pairContract';

const loadTokenRatio = async (
	token1Info: TokenInfo,
	token2Info: TokenInfo,
	factoryAddr: string
): Promise<number | null> => {
	const reserves = await getPairReserves(token1Info, token2Info, factoryAddr);

	if (!reserves || reserves.reserve1 === 0n || reserves.reserve2 === 0n) {
		return null;
	}

	let tokensRatio = Number(reserves.reserve1) / Number(reserves.reserve2);
	return tokensRatio;
};

export default loadTokenRatio;
