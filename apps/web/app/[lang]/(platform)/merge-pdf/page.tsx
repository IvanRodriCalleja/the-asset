import { Metadata } from 'next';

import { LocaleParam } from '@theasset/internationalization/domain/locale-param';
import { getLocale } from '@theasset/internationalization/server/get-locale';
import { withLocale } from '@theasset/internationalization/server/withLocale';

import { MergePdf } from 'modules/pdf-merge/ui/MergePdf';
import { MergePdfStateProvider } from 'modules/pdf-merge/ui/mergePdf/MergePdfStateContext';

type MergePdfPageProps = LocaleParam;

export const generateMetadata = async ({ params }: MergePdfPageProps): Promise<Metadata> => {
	const { lang } = await params;

	const { mergePdf } = getLocale(lang);
	return {
		title: mergePdf.metadata.title
	};
};

const MergePdfPage = () => (
	<MergePdfStateProvider>
		<MergePdf />
	</MergePdfStateProvider>
);

export default withLocale(MergePdfPage);
