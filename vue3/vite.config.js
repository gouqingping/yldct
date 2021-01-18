/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-29 11:30:06
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-18 14:15:30
 */
const path = require('path'),ambfs = require("p.fs.amb");
function resolve(dir) { return path.resolve(__dirname, ".", dir) }
// set the current environment
ambfs();
module.exports = {
	// Proxy file address
	alias: {
		"/@/": resolve("src"),
	},
	// Whether to automatically open in the browser
	open: true,
	// Whether to open https
	https: false,
	// Whether to enable server-side rendering
	// ssr: false,
	// Basic public path when serving in production
	base: './',
	// The directory related to "root" where the build output will be placed.
	// If the directory exists, it will be deleted before building.
	// The default is "dist"
	outDir: './dist',
	// Api reverse proxy
	proxy: {
		'/api': './'
	}
}