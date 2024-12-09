import type { AvailableTokens } from '$lib/types/tokens/AvailableTokens';

export type UserLiquidity = {
	poolTokenAmount: string;
	poolShare: string;
	token1: PooledTokenDetails;
	token2: PooledTokenDetails;
};

export type PooledTokenDetails = {
	ticker: keyof AvailableTokens;
	pooledAmount: string;
};
