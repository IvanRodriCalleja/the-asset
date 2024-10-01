import { Dispatch, ReactNode, SetStateAction } from 'react';

import { TheAssetFile, hashArrayBuffer } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { styled } from '@theasset/style-system/jsx';
import { Text } from '@theasset/ui/text';
import { ThumbnailImageContent, ThumbnailRoot } from '@theasset/ui/thumbnail';

import { ThumbnailDesktopFooter } from './shared/ThumbnailDesktopFooter';
import { UnlockPdfModal } from './shared/UnlockPdfModal';

type ThumbnailEncryptedProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

type ActionProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

const BadgeEncrypted = styled('div', {
	base: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: 'full',
		height: 'full',
		textAlign: 'center',
		background: '#faf7ff',
		gap: 2,
		padding: 1
	}
});

export const PdfEncryptedThumbnailDesktop = ({
	file,
	setFiles,
	actions,
	...props
}: ThumbnailEncryptedProps) => {
	const { mergePdf } = useLocale();

	const onUnlockPdf = async (decryptedFile: ArrayBuffer) => {
		const hash = await hashArrayBuffer(decryptedFile);

		setFiles(files => {
			const fileIndex = files.findIndex(({ id }) => id === file.id);

			const newFiles = [...files];
			newFiles[fileIndex] = {
				...file,
				hash,
				buffer: decryptedFile,
				isEncrypted: false
			};

			return newFiles;
		});
	};

	return (
		<ThumbnailRoot width={180} {...props} status="warning">
			{actions && actions({ file, setFiles })}
			<ThumbnailImageContent>
				<BadgeEncrypted>
					<Text size="xs" color="textClear" family="mono">
						{mergePdf.unlockPdf.description}
					</Text>
					<UnlockPdfModal file={file} onUnlockPdf={onUnlockPdf} />
				</BadgeEncrypted>
			</ThumbnailImageContent>

			<ThumbnailDesktopFooter file={file} />
		</ThumbnailRoot>
	);
};
