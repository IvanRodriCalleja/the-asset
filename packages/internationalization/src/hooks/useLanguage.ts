import { use } from 'react';

import { getCurrentLanguage } from '../server/localeHeader';
import { I18nContext } from '../ui/I18nProvider';

export const useLanguage = () => {
	if (typeof window === 'undefined') {
		return getCurrentLanguage();
	}

	return use(I18nContext).currentLanguage;
};
