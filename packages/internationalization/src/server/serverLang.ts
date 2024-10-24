import { cache } from 'react';

import { Language } from '../domain/Language';

// See https://github.com/vercel/next.js/discussions/58862
const getCacheImpl = () => {
	const value: { lang?: Language } = { lang: undefined };
	return value;
};

const getCache = cache(getCacheImpl);

export const getServerLang = () => getCache().lang;

export const setServerLang = (lang: Language) => {
	getCache().lang = lang;
};
