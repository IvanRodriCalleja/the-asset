import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { getSingularOrPlural } from '@theasset/internationalization/infra/get-singular-or-plural';
import { useThePdfTools } from '@theasset/pdf-react/context/the-pdf-actions-context';
import { usePages } from '@theasset/pdf-react/hooks/use-pages';
import { FileState } from '@theasset/pdf-tools';
import { Text } from '@theasset/ui/text';

type FileMetadataProps = {
	file: FileState;
};

export const FileMetadata = ({ file }: FileMetadataProps) => {
	const { shared } = useLocale();
	const pages = usePages(file);
	const { pdfTools } = useThePdfTools();

	const size = pdfTools.getFileSize(file.id);

	return (
		<Text size="xs" color="textClear" family="mono" data-testid="result-metadata">
			{size} - {pages} {getSingularOrPlural(shared.page, pages)}
		</Text>
	);
};
