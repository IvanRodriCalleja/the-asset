import { NextRequest } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { I18nConfig } from '../../config';
import { Language } from '../../domain/Language';

export const getLanguage = (request: NextRequest, config: I18nConfig): Language => {
	const headersArray = Array.from(request.headers.entries());
	const negotiatorHeaders = headersArray.reduce(
		(accumulator, [key, value]) => {
			accumulator[key] = value;
			return accumulator;
		},
		{} as Record<string, string>
	);

	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	if (!languages || (languages.length === 1 && languages[0] === '*')) {
		return config.defaultLanguage;
	}

	return match(languages, config.languages, config.defaultLanguage) as Language;
};
