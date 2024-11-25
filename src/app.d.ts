// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider;
	}
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
