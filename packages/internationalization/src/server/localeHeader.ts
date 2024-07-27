import { NextResponse } from 'next/server';

import { i18nConfig } from '../config';
import { Language } from '../domain/Language';

const headerName = 'x-comerai-language';

export const setLanguageHeader = (response: NextResponse, language: Language) =>
	response.headers.set(headerName, language);

export const getCurrentLanguage = (): Language => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const headers = require('next/headers').headers;
	return (headers().get(headerName) as Language) || i18nConfig.defaultLanguage;
};
