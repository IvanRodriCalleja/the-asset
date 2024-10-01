/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ['@theasset/eslint-config/.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',

	parserOptions: {
		project: true
	},
	rules: {
		camelcase: 0
	}
};
