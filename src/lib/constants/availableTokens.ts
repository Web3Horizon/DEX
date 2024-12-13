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
import TOKENA from '$lib/assets/img/coins/coin1.png';
import TOKENB from '$lib/assets/img/coins/coin2.png';
import TOKENC from '$lib/assets/img/coins/coin3.png';
import TOKEND from '$lib/assets/img/coins/coin4.png';

//**************************************************//
//** Type imports **//
//**************************************************//
import { TokenTickers, type AvailableTokens } from '$lib/types/tokens/AvailableTokens';

// Map of all the available tokens in the app
export const availableTokens: AvailableTokens = {
	TOKENA: {
		ticker: TokenTickers.TOKENA,
		address: PUBLIC_TOKEN_A_ADDR,
		imgPath: TOKENA,
		decimals: Number(PUBLIC_TOKEN_A_DECIMALS)
	},
	TOKENB: {
		ticker: TokenTickers.TOKENB,
		address: PUBLIC_TOKEN_B_ADDR,
		imgPath: TOKENB,
		decimals: Number(PUBLIC_TOKEN_B_DECIMALS)
	},
	TOKENC: {
		ticker: TokenTickers.TOKENC,
		address: PUBLIC_TOKEN_C_ADDR,
		imgPath: TOKENC,
		decimals: Number(PUBLIC_TOKEN_C_DECIMALS)
	},
	TOKEND: {
		ticker: TokenTickers.TOKEND,
		address: PUBLIC_TOKEN_D_ADDR,
		imgPath: TOKEND,
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
