import { use } from 'react';

import { Locales } from '../domain/Locales';
import { getCurrentLanguage } from '../server/localeHeader';
import { I18nContext } from '../ui/LocalesContext';

export const useLocale = () => {
	if (typeof window === 'undefined') {
		const language = getCurrentLanguage();
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const result = require(`../locales/${language}.ts`).default as unknown as Locales;

		return result;
	}

	return use(I18nContext).locales;
};
