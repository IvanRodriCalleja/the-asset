import { Language } from '@comerai/internationalization/language';
import { UrlObject } from 'url';

export const getLocaleRoute = (language: Language, route: string | UrlObject) =>
	`/${language}${route.toString()}`;
