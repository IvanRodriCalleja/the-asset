import { defineConfig, defineSemanticTokens } from '@pandacss/dev';

import { resolve } from 'path';

const uiPackage = resolve(__dirname, '../ui');

export default defineConfig({
	preflight: true,
	presets: ['@shadow-panda/preset'],
	outExtension: 'js',
	cwd: resolve(__dirname),
	include: [
		`${process.cwd()}/app/**/*.{ts,tsx,js,jsx}`,
		`${process.cwd()}/modules/**/*.{ts,tsx,js,jsx}`,
		`${uiPackage}/**/*.{ts,tsx,js,jsx}`,
	],
	exclude: [],
	outdir: 'generated',
	jsxFramework: 'react',
	importMap: '@theasset/style-system',
});
