import type { CoinImagePaths } from './coinImagePaths';

export type UserLiquidity = {
	poolTokenAmount: string;
	poolShare: string;
	coin1: CoinPooledDetails;
	coin2: CoinPooledDetails;
};

type CoinPooledDetails = {
	ticker: keyof CoinImagePaths;
	pooledAmount: string;
};
