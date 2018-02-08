import App from './app';

window.app = new App();

app.renderPage(location.hash);

window.addEventListener('hashchange', function() {
	app.renderPage(location.hash);
}, false);
