declare module '*.svg' {
	import { SvelteComponentTyped } from 'svelte';
	export default class SVGComponent extends SvelteComponentTyped<
		svelte.JSX.SVGAttributes<SVGSVGElement>
	> {}
}
