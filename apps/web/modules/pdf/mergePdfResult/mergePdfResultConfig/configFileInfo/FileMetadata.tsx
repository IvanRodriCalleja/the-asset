import { useCache } from '@theasset/cache/useCache';
import { useLocale } from '@theasset/internationalization/hooks';
import { getDocument, getSize } from '@theasset/pdf/document';
import { Text } from '@theasset/ui/text';

type FileMetadataProps = {
	buffer: ArrayBuffer;
	hash: string;
};

export const FileMetadata = ({ buffer, hash }: FileMetadataProps) => {
	const { shared } = useLocale();
	const pdf = useCache({ hash, type: 'pdf' }, () => getDocument({ buffer })); // TODO: Share in a unique hook

	const size = getSize(buffer);

	return (
		<Text size="xs" color="textClear" family="mono">
			{size} - {pdf.numPages} {shared.pages}
		</Text>
	);
};
