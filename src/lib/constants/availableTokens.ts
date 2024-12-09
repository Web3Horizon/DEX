//**************************************************//
//** Import paths to coin images **//
//**************************************************//
import UNI from '$lib/assets/img/coins/uniswap_coin.png';
import COIN1 from '$lib/assets/img/coins/coin1.png';
import COIN2 from '$lib/assets/img/coins/coin2.png';
import COIN3 from '$lib/assets/img/coins/coin3.png';
import COIN4 from '$lib/assets/img/coins/coin4.png';

//**************************************************//
//** Type imports **//
//**************************************************//
import { TokenTickers, type AvailableTokens } from '$lib/types/tokens/AvailableTokens';

// Map of all the available tokens in the app
export const availableTokens: AvailableTokens = {
	UNI: {
		ticker: TokenTickers.UNI,
		address: 'tokenAddress',
		imgPath: UNI
	},
	COIN1: {
		ticker: TokenTickers.COIN1,
		address: 'tokenAddress',
		imgPath: COIN1
	},
	COIN2: {
		ticker: TokenTickers.COIN2,
		address: 'tokenAddress',
		imgPath: COIN2
	},
	COIN3: {
		ticker: TokenTickers.COIN3,
		address: 'tokenAddress',
		imgPath: COIN3
	},
	COIN4: {
		ticker: TokenTickers.COIN4,
		address: 'tokenAddress',
		imgPath: COIN4
	}
};
