import { LocaleParam } from '../domain/LocaleParam';
import { setServerLang } from './serverLang';

type TheAssetPage<T extends {}> = (props: T) => JSX.Element | Promise<JSX.Element>;

export const withLocale = <T extends LocaleParam>(Page: TheAssetPage<T>) => {
	return async (props: T): Promise<JSX.Element> => {
		setServerLang((await props.params).lang);

		return <Page {...props} />;
	};
};
