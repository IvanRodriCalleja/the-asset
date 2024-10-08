import { Metadata } from 'next';

import { LocaleParam } from '@theasset/internationalization/domain/locale-param';
import { getLocale } from '@theasset/internationalization/server/get-locale';

import { MergePdf } from 'modules/pdf/MergePdf';

type MergePdfPageProps = LocaleParam;

export function generateMetadata({ params }: MergePdfPageProps): Metadata {
	const { mergePdf } = getLocale(params.lang);
	return {
		title: mergePdf.metadata.title
	};
}

const MergePdfPage = () => <MergePdf />;

export default MergePdfPage;
