import type { AvailableTokens } from '$lib/types/tokens/AvailableTokens';

export type UserLiquidity = {
	poolTokenAmount: string;
	poolShare: string;
	coin1: CoinPooledDetails;
	coin2: CoinPooledDetails;
};

type CoinPooledDetails = {
	ticker: keyof AvailableTokens;
	pooledAmount: string;
};
