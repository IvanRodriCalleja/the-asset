import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { usePdf } from '@theasset/pdf-react/infra/usePdf';
import { getSize } from '@theasset/pdf/document';
import { Text } from '@theasset/ui/text';

type FileMetadataProps = {
	file: TheAssetFile;
};

export const FileMetadata = ({ file }: FileMetadataProps) => {
	const { shared } = useLocale();
	const pdf = usePdf(file);

	const size = getSize(file.buffer);

	return (
		<Text size="xs" color="textClear" family="mono">
			{size} - {pdf.numPages} {shared.pages}
		</Text>
	);
};
