import { defineConfig } from '@pandacss/dev';
import { resolve } from 'path';

import theAssetPreset from './src';

const iconsPackage = resolve(__dirname, '../icons');
const uiPackage = resolve(__dirname, '../ui');
const pdfReactPackage = resolve(__dirname, '../pdf-react');

export default defineConfig({
	preflight: true,
	presets: [theAssetPreset],
	outExtension: 'js',
	cwd: resolve(__dirname),
	lightningcss: true,
	include: [
		`${process.cwd()}/app/**/*.{ts,tsx,js,jsx}`,
		`${process.cwd()}/modules/**/*.{ts,tsx,js,jsx}`,
		`${uiPackage}/**/*.{ts,tsx,js,jsx}`,
		`${pdfReactPackage}/**/*.{ts,tsx,js,jsx}`,
		`${iconsPackage}/**/*.{ts,tsx,js,jsx}`
	],
	exclude: [],
	outdir: 'generated',
	jsxFramework: 'react',
	importMap: '@theasset/style-system'
});
