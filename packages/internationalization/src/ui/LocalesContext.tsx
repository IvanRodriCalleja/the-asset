'use client';

import { PropsWithChildren, createContext } from 'react';

import { Language } from '../domain/Language';
import { Locales } from '../domain/Locales';
import enLocale from '../locales/en';

type I18nContextValue = {
	locales: Locales;
	currentLanguage: Language;
};

export const I18nContext = createContext<I18nContextValue>({
	locales: enLocale,
	currentLanguage: Language.EN
});

export const I18nProvider = ({
	children,
	currentLanguage,
	locales
}: PropsWithChildren<I18nContextValue>) => {
	return (
		<I18nContext.Provider value={{ locales, currentLanguage }}>{children}</I18nContext.Provider>
	);
};
