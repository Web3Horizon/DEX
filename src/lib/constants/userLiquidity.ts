import type { CoinImagePaths } from './coinImagePaths';

type LiquidityDetails = {
	poolTokens: string;
	ticker1Pooled: string;
	ticker2Pooled: string;
	poolShare: string;
};

export type UserLiquidity = {
	ticker1: keyof CoinImagePaths;
	ticker2: keyof CoinImagePaths;
	details: LiquidityDetails;
};
