import { Language } from './domain/Language';

export type I18nConfig = {
	defaultLanguage: Language;
	languages: Language[];
};

export const i18nConfig: I18nConfig = {
	defaultLanguage: Language.EN,
	languages: Object.values(Language)
};
