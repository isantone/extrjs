import Router from './router';
import forEach from 'lodash/forEach';

function App() {
	this.router = new Router();
	this.blocks = [];
}

App.prototype.renderPage = function(hash) {
	this.oldBlocks = this.blocks || null;
	this.blocks = this.router.dispatch(hash);
	if (this.oldBlocks) {
		forEach(this.oldBlocks, function(block) {
			block.delete();
		});
	}
	if (this.blocks) {
		forEach(this.blocks, function(block) {
			block.init();
		});
	}
};

export default App;
