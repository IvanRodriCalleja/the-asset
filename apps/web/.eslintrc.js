/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ['@theasset/eslint-config/.eslintrc.cjs', 'next/core-web-vitals'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true
	},
	settings: {
		next: {
			rootDir: 'apps/web/'
		}
	},
	ignorePatterns: ['postcss.config.js', 'next.config.mjs'],
};
