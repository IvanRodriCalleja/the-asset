import { PdfEncryptedThumbnailMobile } from '@theasset/pdf-react/ui/pdf-encrypted-thumbnail-mobile';
import { PdfThumbnailMobile } from '@theasset/pdf-react/ui/pdf-thumbnail-mobile';
import { Stack } from '@theasset/style-system/jsx';
import { SortableItem, SortableRoot } from '@theasset/ui/sortable';

import { FilePreviewProps } from '../FilePreview';
import { MergePdfActionsMobile } from './filePreviewMobile/MergePdfActionsMobile';

export const FilePreviewMobile = ({ files, setFiles }: FilePreviewProps) => (
	<SortableRoot orientation="vertical" value={files} onValueChange={setFiles}>
		<Stack direction="column" marginInline="auto" width="100%" paddingBlock={4} paddingInline={4}>
			{files.map(file => (
				<SortableItem key={file.id} value={file.id} asChild>
					{file.isEncrypted ? (
						<PdfEncryptedThumbnailMobile
							file={file}
							setFiles={setFiles}
							actions={MergePdfActionsMobile}
						/>
					) : (
						<PdfThumbnailMobile file={file} setFiles={setFiles} actions={MergePdfActionsMobile} />
					)}
				</SortableItem>
			))}
		</Stack>
	</SortableRoot>
);
