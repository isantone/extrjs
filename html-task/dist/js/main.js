import App from './app';

var app = new App();
app.renderPage(location.hash);

window.addEventListener('hashchange', function() {
	app.renderPage(location.hash);
}, false);
