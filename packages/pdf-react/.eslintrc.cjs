/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ['@theasset/eslint-config/.eslintrc.js'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true
	}
};
