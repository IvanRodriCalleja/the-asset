import { NextRequest, NextResponse } from 'next/server';

import { I18nConfig } from '../config';
import { getLanguage } from './i18nMiddleware/getLanguage';
import { setLanguageHeader } from './localeHeader';

export const i18nMiddleware = (request: NextRequest, config: I18nConfig): NextResponse => {
	const pathname = request.nextUrl.pathname;
	const currentLocale = config.languages.find(
		language => pathname.startsWith(`/${language}/`) || pathname === `/${language}`
	);

	if (currentLocale) {
		const response = NextResponse.next();
		setLanguageHeader(response, currentLocale);
		return response;
	} else {
		const locale = getLanguage(request, config);
		request.nextUrl.pathname = `/${locale}${pathname}`;
		const response = NextResponse.redirect(request.nextUrl);

		setLanguageHeader(response, locale);
		return response;
	}
};
