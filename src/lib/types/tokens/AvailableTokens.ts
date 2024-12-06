import type { TokenInfo } from '$lib/types/tokens/Token';

export enum TokenTickers {
	TOKENA = 'TOKENA',
	TOKENB = 'TOKENB'
}
export type AvailableTokens = Record<TokenTickers, TokenInfo>;
