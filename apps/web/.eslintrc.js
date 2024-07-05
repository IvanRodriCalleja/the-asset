/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ['@theasset/eslint-config/.eslintrc.js', 'next/core-web-vitals'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true
	},
	settings: {
		next: {
			rootDir: 'apps/web/'
		}
	}
};
