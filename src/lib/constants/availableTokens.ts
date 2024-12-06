//**************************************************//
//** Environment imports **//
//**************************************************//
import {
	PUBLIC_TOKEN_A_ADDR,
	PUBLIC_TOKEN_B_ADDR,
	PUBLIC_TOKEN_A_DECIMALS,
	PUBLIC_TOKEN_B_DECIMALS
} from '$env/static/public';

//**************************************************//
//** Import paths to coin images **//
//**************************************************//
import TOKENA from '$lib/assets/img/coins/coin1.png';
import TOKENB from '$lib/assets/img/coins/coin2.png';

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
	}
};
