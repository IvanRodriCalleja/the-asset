import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { getFileSize } from '@theasset/file/infra/get-file-size';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { getSingularOrPlural } from '@theasset/internationalization/infra/get-singular-or-plural';
import { usePages } from '@theasset/pdf-react/hooks/use-pages';
import { Text } from '@theasset/ui/text';

type FileMetadataProps = {
	file: TheAssetFile;
};

export const FileMetadata = ({ file }: FileMetadataProps) => {
	const { shared } = useLocale();
	const pages = usePages(file);

	const size = getFileSize(file.buffer);

	return (
		<Text size="xs" color="textClear" family="mono" data-testid="result-metadata">
			{size} - {pages} {getSingularOrPlural(shared.page, pages)}
		</Text>
	);
};
