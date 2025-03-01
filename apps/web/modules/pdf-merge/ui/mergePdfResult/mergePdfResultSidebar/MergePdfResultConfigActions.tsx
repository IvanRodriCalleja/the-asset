import { DownloadIcon, ReloadIcon } from '@radix-ui/react-icons';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { useThePdfTools } from '@theasset/pdf-react/context/the-pdf-actions-context';
import { FileState } from '@theasset/pdf-tools';

import { Link } from '@theasset/ui/next/link';
import { Sidebar } from '@theasset/ui/sidebar';

import { downloadFile } from 'modules/shared/infra/downloadFile';
import { mergePdfPath } from 'routes';

type MergePdfResultConfigActionsProps = {
	file: FileState;
	fileName: string;
};

export const MergePdfResultConfigActions = ({
	file,
	fileName
}: MergePdfResultConfigActionsProps) => {
	const { shared, mergePdfResult } = useLocale();
	const { pdfTools } = useThePdfTools();

	const onDownload = async () => {
		const buffer = await pdfTools.getFile(file.id);
		downloadFile(buffer, fileName, 'application/pdf');
	};

	return (
		<>
			<Link href={mergePdfPath} size="lg" variant="outline">
				<ReloadIcon />
				{mergePdfResult.mergeNewPdf}
			</Link>

			<Sidebar.ActionWithConfigButton onPress={onDownload}>
				<DownloadIcon />
				{shared.download}
			</Sidebar.ActionWithConfigButton>
		</>
	);
};
