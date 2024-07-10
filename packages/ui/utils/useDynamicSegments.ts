import { Language } from '@theasset/internationalization/domain';
import { useParams } from 'next/navigation';

type ComeraiParams = {
	lang?: Language;
	restaurantId?: string;
};

export const useDynamicSegments = (url: string) => {
	const params = useParams<ComeraiParams>();

	const dynamicUrl = url.split('/').reduce((url, segment) => {
		if (segment.startsWith('[') && segment.endsWith(']')) {
			const paramKey = segment.substring(1, segment.length - 1);

			if (paramKey in params) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				return url.replace(segment, params[paramKey] as string);
			}
		}
		return url;
	}, url);

	return dynamicUrl;
};
