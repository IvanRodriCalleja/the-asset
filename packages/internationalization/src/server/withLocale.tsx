import { ReactElement } from 'react';

import { LocaleParam } from '../domain/LocaleParam';
import { setServerLang } from './serverLang';

type TheAssetPage<T extends {}> = (props: T) => ReactElement | Promise<ReactElement>;

export const withLocale = <T extends LocaleParam>(Page: TheAssetPage<T>) => {
	return async (props: T): Promise<ReactElement> => {
		setServerLang((await props.params).lang);

		return <Page {...props} />;
	};
};
