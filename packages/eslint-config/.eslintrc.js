const { resolve } = require('node:path');
const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	plugins: ['eslint-plugin-json'],
	extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		allowImportExportEverywhere: true,
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true
		}
	},
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true
	},
	globals: {
		React: true,
		JSX: true,
		RequestInit: true
	},
	rules: {
		'no-console': 0,
		'no-debugger': 0,
		'typescript/no-type-alias': 0,
		'interface-over-type-literal': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		camelcase: [
			'warn',
			{
				allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', '__webpack_hash__']
			}
		],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		],
		'@typescript-eslint/prefer-interface': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/interface-name-prefix': 0,
		'@typescript-eslint/no-use-before-define': 0,
		'@typescript-eslint/no-non-null-assertion': 0,
		'@typescript-eslint/ban-ts-ignore': 0,
		'@typescript-eslint/no-empty-function': 0,
		'@typescript-eslint/ban-types': [
			'error',
			{
				extendDefaults: true,
				types: {
					'{}': false
				}
			}
		],
		'no-alert': 'error',
		'no-empty-function': 'off',
		'require-await': 'warn',
		'no-duplicate-imports': 'warn',
		'no-dupe-class-members': 'warn',
		'no-multiple-empty-lines': 'warn',
		'react/no-unescaped-entities': 0,
		'react/prop-types': 0,
		'react/display-name': 0,
		//Array
		'no-array-constructor': 'error',
		//Variables
		'no-undef': 'error',
		'prefer-const': 'error',
		'one-var': [
			'error',
			{
				let: 'never',
				const: 'never'
			}
		],
		'no-unused-vars': 'error',
		//Destructuring
		'prefer-destructuring': 0,
		//Spreadings
		'prefer-object-spread': 'error',
		'prefer-rest-params': 'error'
	},
	settings: {
		react: {
			version: 'detect'
		},
		'import/resolver': {
			typescript: {
				project
			}
		}
	},
	ignorePatterns: [
		// Ignore dotfiles
		'.*.js',
		'node_modules/'
	],
	overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }]
};
