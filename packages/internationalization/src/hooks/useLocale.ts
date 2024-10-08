import { use } from 'react';

import { getLocale } from '../server/getLocale';
import { getCurrentLanguage } from '../server/localeHeader';
import { I18nContext } from '../ui/I18nProvider';

export const useLocale = () => {
	if (typeof window === 'undefined') {
		const language = getCurrentLanguage();

		return getLocale(language);
	}

	return use(I18nContext).locales;
};
