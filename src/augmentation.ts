import type { Formula } from './index.js';

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ Formula.pluginName ]: Formula;
	}
}
