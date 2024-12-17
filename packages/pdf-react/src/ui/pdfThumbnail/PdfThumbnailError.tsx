import { useEffect, useTransition } from 'react';

import { FallbackProps } from 'react-error-boundary';

import * as Thumbnail from '@theasset/ui/thumbnail';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { UpdatedFileState } from '@theasset/pdf-tools';
import { PdfToolsError, PdfToolsErrorCodes } from '@theasset/pdf-tools/types';
import { styled } from '@theasset/style-system/jsx';
import { Text } from '@theasset/ui/text';

import { PdfThumbnailProps } from '../PdfThumbnail';
import { UnlockPdfModal } from './pdfThumbnailError/UnlockPdfModal';

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

type PdfThumbnailErrorProps = FallbackProps & PdfThumbnailProps;

export const PdfThumbnailError = ({
	error,
	file,
	resetErrorBoundary,
	onFileChange,
	actions
}: PdfThumbnailErrorProps) => {
	const [isPending, startTransition] = useTransition();

	const { mergePdf } = useLocale();

	useEffect(() => {
		onFileChange(file.id, {
			...file,
			isEncrypted: true
		});
	}, []);

	const onUnlockPdf = async (fileState: UpdatedFileState) => {
		await startTransition(() =>
			onFileChange(file.id, {
				...file,
				...fileState
			})
		);
		resetErrorBoundary();
	};

	const isPasswordError =
		error instanceof PdfToolsError && error.code === PdfToolsErrorCodes.PasswordError;

	return (
		<Thumbnail.Root status="warning">
			<Thumbnail.Body>
				<Thumbnail.ImageArea status="warning">
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
				</Thumbnail.ImageArea>

				<Thumbnail.DragHandler />
			</Thumbnail.Body>

			<Thumbnail.FileName>{file.name}</Thumbnail.FileName>

			<Thumbnail.ActionsBox>{actions && actions({ file, isError: true })}</Thumbnail.ActionsBox>
		</Thumbnail.Root>
	);
};
