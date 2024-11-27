import { Dispatch, ReactNode, SetStateAction, useEffect, useTransition } from 'react';

import { FallbackProps } from 'react-error-boundary';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { FileState, UpdatedFileState } from '@theasset/pdf-tools';
import { PdfToolsError, PdfToolsErrorCodes } from '@theasset/pdf-tools/types';
import { styled } from '@theasset/style-system/jsx';
import { Text } from '@theasset/ui/text';
import { ThumbnailFooter, ThumbnailImageContent, ThumbnailRoot } from '@theasset/ui/thumbnail';

import { FileName } from '../../shared/FileName';
import { UnlockPdfModal } from '../../shared/UnlockPdfModal';

type ThumbnailEncryptedProps = FallbackProps & {
	file: FileState;
	setFiles: Dispatch<SetStateAction<FileState[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

type ActionProps = {
	file: FileState;
	setFiles: Dispatch<SetStateAction<FileState[]>>;
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
	error,
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

	const onUnlockPdf = async (fileState: UpdatedFileState) => {
		await startTransition(() =>
			setFiles(files => {
				const fileIndex = files.findIndex(({ id }) => id === file.id);

				const newFiles = [...files];
				newFiles[fileIndex] = {
					...file,
					...fileState
				};

				return newFiles;
			})
		);
		resetErrorBoundary();
	};

	const isPasswordError =
		error instanceof PdfToolsError && error.code === PdfToolsErrorCodes.PasswordError;

	return (
		<ThumbnailRoot width={180} {...props} status="warning">
			{actions && actions({ file, setFiles })}
			<ThumbnailImageContent>
				{isPasswordError ? (
					<BadgeEncrypted>
						<Text size="xs" color="textClear" family="mono">
							{mergePdf.unlockPdf.description}
						</Text>
						<UnlockPdfModal file={file} onUnlockPdf={onUnlockPdf} isPending={isPending} />
					</BadgeEncrypted>
				) : (
					<BadgeEncrypted>
						<Text size="xs" color="textClear" family="mono">
							{mergePdf.thumbnailError}
						</Text>
					</BadgeEncrypted>
				)}
			</ThumbnailImageContent>

			<ThumbnailFooter>
				<FileName data-testid="pdf-name">{file.name}</FileName>
			</ThumbnailFooter>
		</ThumbnailRoot>
	);
};
