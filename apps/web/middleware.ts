import { NextRequest } from 'next/server';

import { i18nConfig } from '@theasset/internationalization/config';
import { i18nMiddleware } from '@theasset/internationalization/server/middleware';

const comeraiMiddleware = (request: NextRequest) => i18nMiddleware(request, i18nConfig);

export default comeraiMiddleware;

export const config = {
	matcher: ['/((?!api|pdfjs|monitoring|_next/static|_next/image|favicon.ico).*)']
};
