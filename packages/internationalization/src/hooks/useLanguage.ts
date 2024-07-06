import { use } from 'react';
import { I18nContext } from '../ui/LocalesContext';
import { getCurrentLanguage } from '../server/localeHeader';

export const useLanguage = () => {
	if (typeof window === 'undefined') {
		return getCurrentLanguage();
	}

	return use(I18nContext).currentLanguage;
};
