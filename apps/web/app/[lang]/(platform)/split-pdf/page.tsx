import { Metadata } from 'next';

import { LocaleParam } from '@theasset/internationalization/domain/locale-param';
import { getLocale } from '@theasset/internationalization/server/get-locale';
import { withLocale } from '@theasset/internationalization/server/withLocale';

import { SplitPdfStore } from 'modules/pdf-split/store/SplitPdfStore';
import { SplitPdf } from 'modules/pdf-split/ui/SplitPdf';

type SplitPdfPageProps = LocaleParam;

export const generateMetadata = async ({ params }: SplitPdfPageProps): Promise<Metadata> => {
	const { lang } = await params;

	const { splitPdf } = getLocale(lang);
	return {
		title: splitPdf.metadata.title
	};
};

const SplitPdfPage = () => (
	<SplitPdfStore>
		<SplitPdf />
	</SplitPdfStore>
);

export default withLocale(SplitPdfPage);
