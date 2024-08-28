import { PdfEncryptedThumbnailDesktop, PdfThumbnailDesktop } from '@theasset/pdf-react/thumbnail';
import { Stack } from '@theasset/style-system/jsx';
import { Sortable } from '@theasset/ui/sortable';

import { FilePreviewProps } from '../FilePreview';
import { MergePdfActionsDesktop } from './filePreviewDesktop/MergePdfActionsDesktop';

export const FilePreviewDesktop = ({ files, setFiles }: FilePreviewProps) => (
	<Sortable.Root orientation="mixed" value={files} onValueChange={setFiles}>
		<Stack
			direction="row"
			marginInline="auto"
			flexWrap="wrap"
			justifyContent="center"
			maxWidth={'100%'}
			paddingBlock={16}
			paddingInline={16}>
			{files.map(file => (
				<Sortable.SortableItem key={file.id} value={file.id} asTrigger asChild>
					{file.isEncrypted ? (
						<PdfEncryptedThumbnailDesktop
							file={file}
							setFiles={setFiles}
							actions={MergePdfActionsDesktop}
						/>
					) : (
						<PdfThumbnailDesktop file={file} setFiles={setFiles} actions={MergePdfActionsDesktop} />
					)}
				</Sortable.SortableItem>
			))}
		</Stack>
	</Sortable.Root>
);
