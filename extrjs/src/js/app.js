import '../scss/main.scss';

import {Router} from './router';

export default class App {
	constructor() {
		this.router = new Router();
		this.blocks = [];
	}

	renderPage(hash) {
		this.oldBlocks = this.blocks || null;
		this.blocks = this.router.dispatch(hash);

		if (this.oldBlocks) {
			[].forEach.call(this.oldBlocks, function(block) {
				block.delete();
			});
		}

		if (this.blocks) {
			[].forEach.call(this.blocks, function(block) {
				block.init();
			});
		}
	}
}
