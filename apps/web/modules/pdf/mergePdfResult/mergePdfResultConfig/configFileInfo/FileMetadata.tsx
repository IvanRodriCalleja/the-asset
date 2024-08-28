import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { getSingularOrPlural } from '@theasset/internationalization/infra';
import { usePages } from '@theasset/pdf-react/infra/usePages';
import { getSize } from '@theasset/pdf/document';
import { Text } from '@theasset/ui/text';

type FileMetadataProps = {
	file: TheAssetFile;
};

export const FileMetadata = ({ file }: FileMetadataProps) => {
	const { shared } = useLocale();
	const pages = usePages(file);

	const size = getSize(file.buffer);

	return (
		<Text size="xs" color="textClear" family="mono">
			{size} - {pages} {getSingularOrPlural(shared.page, pages)}
		</Text>
	);
};
