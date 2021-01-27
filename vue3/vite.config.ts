/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 11:32:42
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 09:41:25
 */
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
const ambfs = require("p.fs.amb");
function pathResolve(dir: string) {
	return resolve(__dirname, '.', dir);
}
// set the current environment
ambfs();
const pkg = require('./package.json');
const root: string = process.cwd();
interface ViteEnv {
	VITE_PORT: number;
	VITE_USE_MOCK: boolean;
	VITE_USE_PWA: boolean;
	VITE_PUBLIC_PATH: string;
	VITE_PROXY: [string, string][];
	VITE_GLOB_APP_TITLE: string;
	VITE_GLOB_APP_SHORT_NAME: string;
	VITE_USE_CDN: boolean;
	VITE_DROP_CONSOLE: boolean;
	VITE_BUILD_GZIP: boolean;
	VITE_DYNAMIC_IMPORT: boolean;
	VITE_LEGACY: boolean;
}
function wrapperEnv(envConf: any): ViteEnv {
	const ret: any = {
		VITE_PUBLIC_PATH: "./"
	};
	for (const envName of Object.keys(envConf)) {
		console.log(envName)
		let realName = envConf[envName].replace(/\\n/g, '\n');
		realName = realName === 'true' ? true : realName === 'false' ? false : realName;
		if (envName === 'VITE_PORT') {
			realName = Number(realName);
		}
		if (envName === 'VITE_PROXY') {
			try {
				realName = JSON.parse(realName);
			} catch (error) { }
		}
		ret[envName] = realName;
		process.env[envName] = realName;
	}
	return ret;
};


type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, any & { rewrite: (path: string) => string }>;

const httpsRE = /^https:\/\//;
function createProxy(list: ProxyList = []) {
	const ret: ProxyTargetList = {};
	for (const [prefix, target] of list) {
		const isHttps = httpsRE.test(target);

		// https://github.com/http-party/node-http-proxy#options
		ret[prefix] = {
			target: target,
			changeOrigin: true,
			ws: true,
			rewrite: (path: any) => path.replace(new RegExp(`^${prefix}`), ''),
			// https is require secure=false
			...(isHttps ? { secure: false } : {}),
		};
	}
	return ret;
}
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
	const env = loadEnv(mode, root);
	const isBuild = command === 'build';
	const viteEnv = wrapperEnv(env);
	const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;
	return {
		root,
		define: {
			__VERSION__: pkg.version,
			__VUE_I18N_LEGACY_API__: false,
			__VUE_I18N_FULL_INSTALL__: false,
			__INTLIFY_PROD_DEVTOOLS__: false,
		},
		plugins: [
			vue(),
			vueJsx(),
			viteMockServe({
				mockPath: 'mock',
				localEnabled: isBuild
			})
		],
		// Proxy file address
		alias: {
			'/@/': `${pathResolve('src')}/`,
		},
		// Basic public path when serving in production
		base: VITE_PUBLIC_PATH,
		// Whether to automatically open in the browser
		// open: true,
		// Whether to open https
		//https: false,
		// Whether to enable server-side rendering
		// ssr: false,
		build: {
			polyfillDynamicImport: VITE_LEGACY,
			terserOptions: {
				compress: {
					keep_infinity: true,
					drop_console: VITE_DROP_CONSOLE,
				},
			},
			// minify: 'esbuild',
			rollupOptions: {
				output: {
					compact: true,
				},
			},
			commonjsOptions: {
				ignore: [
					// xlsx
					// 'fs',
					// 'crypto',
					// 'stream',
				],
			},
		},
		// The directory related to "root" where the build output will be placed.
		// If the directory exists, it will be deleted before building.
		// The default is "dist"
		//outDir: './dist',
		// Api reverse proxy
		server: {
			port: VITE_PORT,
			proxy: createProxy(VITE_PROXY),
			hmr: {
				overlay: true,
			},
		},
	}
};
