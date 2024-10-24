import { Language } from './Language';

export type LocaleParam = {
	params: Promise<{ lang: Language }>;
};
