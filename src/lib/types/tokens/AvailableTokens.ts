import type { TokenInfo } from '$lib/types/tokens/Token';

export enum TokenTickers {
	UNI = 'UNI',
	COIN1 = 'COIN1',
	COIN2 = 'COIN2',
	COIN3 = 'COIN3',
	COIN4 = 'COIN4'
}
export type AvailableTokens = Record<TokenTickers, TokenInfo>;
