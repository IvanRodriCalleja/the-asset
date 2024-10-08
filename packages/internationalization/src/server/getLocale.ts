import { Language } from '../domain/Language';
import { Locales } from '../domain/Locales';

export const getLocale = (language: Language) => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const result = require(`../locales/${language}.ts`).default as unknown as Locales;

	return result;
};
