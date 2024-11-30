import type { CoinImagePaths } from './coinImagePaths';

export type UserLiquidity = { ticker1: keyof CoinImagePaths; ticker2: keyof CoinImagePaths };
