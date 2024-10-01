import { Dispatch, ReactNode, SetStateAction } from 'react';

import { DragHandleDots2Icon } from '@radix-ui/react-icons';

import { TheAssetFile, hashArrayBuffer } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { getSingularOrPlural } from '@theasset/internationalization/infra/get-singular-or-plural';
import { Box, Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { SortableDragHandle } from '@theasset/ui/sortable';
import { Text } from '@theasset/ui/text';
import { ThumbnailRoot } from '@theasset/ui/thumbnail';

import { usePages } from '../hooks/usePages';
import { UnlockPdfModal } from './shared/UnlockPdfModal';

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

type PdfEncryptedThumbnailMobileProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

type ActionProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const PdfEncryptedThumbnailMobile = ({
	file,
	setFiles,
	actions,
	...props
}: PdfEncryptedThumbnailMobileProps) => {
	const { shared, mergePdf } = useLocale();
	const pages = usePages(file);

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
		<ThumbnailRoot width="100%" paddingBottom={0} {...props} status="warning">
			<Stack direction="row" alignItems="center" overflow="hidden">
				<Box>
					<Badge>
						{pages} {getSingularOrPlural(shared.page, pages)}
					</Badge>
				</Box>
				<FileName>{file.name}</FileName>
			</Stack>
			<Stack direction="row">
				<Box flex={1} minWidth="56px">
					<BadgeEncrypted>
						<Text size="xs" color="textClear" family="mono">
							{mergePdf.unlockPdf.description}
						</Text>
						<UnlockPdfModal file={file} onUnlockPdf={onUnlockPdf} />
					</BadgeEncrypted>
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
