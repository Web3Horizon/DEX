//**************************************************//
//** Environment imports **//
//**************************************************//
import {
	PUBLIC_TOKEN_A_ADDR,
	PUBLIC_TOKEN_B_ADDR,
	PUBLIC_TOKEN_C_ADDR,
	PUBLIC_TOKEN_A_DECIMALS,
	PUBLIC_TOKEN_B_DECIMALS,
	PUBLIC_TOKEN_C_DECIMALS,
	PUBLIC_TOKEN_D_ADDR,
	PUBLIC_TOKEN_D_DECIMALS
} from '$env/static/public';

//**************************************************//
//** Import paths to coin images **//
//**************************************************//
import SLV from '$lib/assets/img/coins/slv.png';
import GLD from '$lib/assets/img/coins/gld.png';
import PLT from '$lib/assets/img/coins/plt.png';
import RUBY from '$lib/assets/img/coins/ruby.png';

//**************************************************//
//** Type imports **//
//**************************************************//
import { TokenTickers, type AvailableTokens } from '$lib/types/tokens/AvailableTokens';

// Map of all the available tokens in the app
export const availableTokens: AvailableTokens = {
	SLV: {
		ticker: TokenTickers.SLV,
		address: PUBLIC_TOKEN_A_ADDR,
		imgPath: SLV,
		decimals: Number(PUBLIC_TOKEN_B_DECIMALS)
	},
	GLD: {
		ticker: TokenTickers.GLD,
		address: PUBLIC_TOKEN_B_ADDR,
		imgPath: GLD,
		decimals: Number(PUBLIC_TOKEN_A_DECIMALS)
	},
	PLT: {
		ticker: TokenTickers.PLT,
		address: PUBLIC_TOKEN_C_ADDR,
		imgPath: PLT,
		decimals: Number(PUBLIC_TOKEN_C_DECIMALS)
	},
	RUBY: {
		ticker: TokenTickers.RUBY,
		address: PUBLIC_TOKEN_D_ADDR,
		imgPath: RUBY,
		decimals: Number(PUBLIC_TOKEN_D_DECIMALS)
	}
};

export const addressToTickerMap = generateAddressToTickerMap();

function generateAddressToTickerMap(): Record<string, TokenTickers> {
	const map: Record<string, TokenTickers> = {};

	for (const ticker in availableTokens) {
		const token = availableTokens[ticker as TokenTickers];
		map[token.address] = ticker as TokenTickers;
	}

	return map;
}
