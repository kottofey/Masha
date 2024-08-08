const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',

	entry: {
		'babel': ['@babel/polyfill'],
		'styles': ['./js/styles.js'],
		'albums': ['./js/preview-handler'],
		'cat-boom': ['./js/cat-boom'],
	},

	output: {
		filename: './js/[name]-[contenthash]-bundle.js',
		chunkFilename: './js/[name]-[contenthash]-chunk-bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},

	devtool: 'source-map',

	plugins: [
		new htmlWebpackPlugin({
			template: './index.html',
			favicon: './favicon.ico',
			chunks: ['styles', 'cat-boom', 'babel'],
		}),
		new htmlWebpackPlugin({
			filename: './pages/albums.html',
			template: './pages/albums.html',
			favicon: './favicon.ico',
			chunks: ['styles', 'albums', 'babel'],
		}),
		new htmlWebpackPlugin({
			filename: './pages/about.html',
			template: './pages/about.html',
			favicon: './favicon.ico',
			chunks: ['styles', 'babel'],
		}),
		new htmlWebpackPlugin({
			filename: './pages/contacts.html',
			template: './pages/contacts.html',
			favicon: './favicon.ico',
			chunks: ['styles', 'cat-boom', 'babel'],
		}),
		new MiniCssExtractPlugin({
			filename: './styles/styles.css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(?:js|mjs|cjs|ts)$/,
				include: path.resolve(__dirname, 'src/js'),
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', { targets: 'defaults' }]],
					},
				},
			},
			{
				test: /\.(scss|sass|css)$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(html?)$/i,
				use: 'html-loader',
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name]-[contenthash][ext]',
				},
			},
			{
				test: /\.(woff|ttf|eot)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name]-[contenthash][ext]',
				},
			},
		],
	},
	devServer: {
		port: 4200,
	},
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
};
