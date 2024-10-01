import { useParams } from 'next/navigation';

import { Language } from '@theasset/internationalization/domain/language';

import { replaceParams } from './replaceParams';

type ComeraiParams = {
	lang?: Language;
	restaurantId?: string;
};

export const useDynamicSegments = (url: string) => {
	const params = useParams<ComeraiParams>();

	return replaceParams(url, params);
};
