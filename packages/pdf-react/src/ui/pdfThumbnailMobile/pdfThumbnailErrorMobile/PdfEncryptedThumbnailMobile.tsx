import { Dispatch, ReactNode, SetStateAction, useEffect, useTransition } from 'react';

import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { FallbackProps } from 'react-error-boundary';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { getSingularOrPlural } from '@theasset/internationalization/infra/get-singular-or-plural';
import { FileState, UpdatedFileState } from '@theasset/pdf-tools';
import { PdfToolsError, PdfToolsErrorCodes } from '@theasset/pdf-tools/types';
import { Box, Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { SortableDragHandle } from '@theasset/ui/sortable';
import { Text } from '@theasset/ui/text';
import { ThumbnailRoot } from '@theasset/ui/thumbnail';

import { usePages } from '../../../hooks/usePages';
import { UnlockPdfModal } from '../../shared/UnlockPdfModal';

const FileName = styled('span', {
	base: {
		truncate: true,
		textStyle: 'xs'
	}
});

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

type PdfEncryptedThumbnailMobileProps = FallbackProps & {
	file: FileState;
	setFiles: Dispatch<SetStateAction<FileState[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

type ActionProps = {
	file: FileState;
	setFiles: Dispatch<SetStateAction<FileState[]>>;
};

export const PdfEncryptedThumbnailMobile = ({
	file,
	error,
	setFiles,
	actions,
	resetErrorBoundary,
	...props
}: PdfEncryptedThumbnailMobileProps) => {
	const [isPending, startTransition] = useTransition();
	const { shared, mergePdf } = useLocale();

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
		<ThumbnailRoot width="100%" paddingBottom={0} {...props} status="warning">
			<Stack direction="row" alignItems="center" overflow="hidden">
				<FileName>{file.name}</FileName>
			</Stack>
			<Stack direction="row">
				<Box flex={1} minWidth="56px">
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
				</Box>

				<Flex alignItems="center" minWidth="40px" width="40px">
					<SortableDragHandle variant="transparent" size="icon">
						<DragHandleDots2Icon />
					</SortableDragHandle>
				</Flex>
			</Stack>

			{actions && actions({ file, setFiles })}
		</ThumbnailRoot>
	);
};
