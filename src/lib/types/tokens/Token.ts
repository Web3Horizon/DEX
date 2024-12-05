import type { TokenTickers } from '$lib/types/tokens/AvailableTokens';

export type TokenInfo = {
	ticker: TokenTickers;
	address: string;
	imgPath: string;
};
