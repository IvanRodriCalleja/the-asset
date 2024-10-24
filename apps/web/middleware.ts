import { NextMiddleware, NextRequest } from 'next/server';

import { i18nConfig } from '@theasset/internationalization/config';
import { i18nMiddleware } from '@theasset/internationalization/server/middleware';

const theAssetMiddleware: NextMiddleware = (request: NextRequest) =>
	i18nMiddleware(request, i18nConfig);

export default theAssetMiddleware;

export const config = {
	matcher: ['/((?!api|pdfjs|monitoring|_next/static|_next/image|favicon.ico).*)']
};
