const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const extractSass = new ExtractTextPlugin({
	filename: "style.css",
	disable: process.env.NODE_ENV === "development"
});

module.exports = {
	watch: true,
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: extractSass.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader", options: {
								//sourceMap: true
							}
						},
						{
							loader: "postcss-loader",
							options: {
								//sourceMap: true
							}
						},
						{
							loader: "sass-loader", options: {
								//sourceMap: true
							}
						}
					]
				})
			},
			{
        test: /\.html$/,
				loader: 'html-loader',
				options: {
					minimize: true,
					//collapseWhitespace: true
				}
      }
		]
	},
	plugins: [
		//new UglifyJsPlugin(),
		extractSass,
		new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 7777
	}
};
