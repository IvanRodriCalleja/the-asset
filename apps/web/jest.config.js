/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './'
});

module.exports = createJestConfig({
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/modules'],
	testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
	testPathIgnorePatterns: ['<rootDir>../../node_modules/']
});
