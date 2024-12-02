import UNI from '$lib/assets/img/uniswap_coin.png';

export const coinImagePaths = {
	UNI: UNI
} as const;

export type CoinImagePaths = typeof coinImagePaths;
