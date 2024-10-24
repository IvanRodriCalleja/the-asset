import { use } from 'react';

import { getLocale } from '../server/getLocale';
import { getServerLang } from '../server/serverLang';
import { I18nContext } from '../ui/I18nProvider';

export const useLocale = () => {
	if (typeof window === 'undefined') {
		const lang = getServerLang();

		if (lang) {
			return getLocale(lang);
		}
		// IF no lang means we are in a use client component so we can't read cache, we use context
	}

	return use(I18nContext).locales;
};
