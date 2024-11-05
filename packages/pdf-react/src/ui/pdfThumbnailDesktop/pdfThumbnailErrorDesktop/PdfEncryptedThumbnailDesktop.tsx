import { Dispatch, ReactNode, SetStateAction, useEffect, useTransition } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { styled } from '@theasset/style-system/jsx';
import { Text } from '@theasset/ui/text';
import { ThumbnailImageContent, ThumbnailRoot } from '@theasset/ui/thumbnail';

import { ThumbnailDesktopFooter } from '../../shared/ThumbnailDesktopFooter';
import { UnlockPdfModal } from '../../shared/UnlockPdfModal';

type ThumbnailEncryptedProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
	actions?: (props: ActionProps) => ReactNode;
	resetErrorBoundary: (...args: unknown[]) => void;
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
	resetErrorBoundary,
	...props
}: ThumbnailEncryptedProps) => {
	const [isPending, startTransition] = useTransition();
	const { mergePdf } = useLocale();

	useEffect(() => {
		setFiles(files => {
			const fileIndex = files.findIndex(({ id }) => id === file.id);

			const newFiles = [...files];
			newFiles[fileIndex] = {
				...file,
				isEncrypted: true
			};

			return newFiles;
		});
	}, []);

	const onUnlockPdf = async ({ buffer, hash }: { buffer: Uint8Array; hash: string }) => {
		await startTransition(() =>
			setFiles(files => {
				const fileIndex = files.findIndex(({ id }) => id === file.id);

				const newFiles = [...files];
				newFiles[fileIndex] = {
					...file,
					hash,
					buffer,
					isEncrypted: false
				};

				return newFiles;
			})
		);
		resetErrorBoundary();
	};

	return (
		<ThumbnailRoot width={180} {...props} status="warning">
			{actions && actions({ file, setFiles })}
			<ThumbnailImageContent>
				<BadgeEncrypted>
					<Text size="xs" color="textClear" family="mono">
						{mergePdf.unlockPdf.description}
					</Text>
					<UnlockPdfModal file={file} onUnlockPdf={onUnlockPdf} isPending={isPending} />
				</BadgeEncrypted>
			</ThumbnailImageContent>

			<ThumbnailDesktopFooter file={file} />
		</ThumbnailRoot>
	);
};
