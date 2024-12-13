import type { TokenInfo } from '$lib/types/tokens/Token';

export enum TokenTickers {
	SLV = 'SLV',
	GLD = 'GLD',
	PLT = 'PLT',
	RUBY = 'RUBY'
}
export type AvailableTokens = Record<TokenTickers, TokenInfo>;
