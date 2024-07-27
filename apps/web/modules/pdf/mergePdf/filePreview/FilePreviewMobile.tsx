import { PdfThumbnailMobile } from '@theasset/pdf-react/thumbnail';
import { Stack } from '@theasset/style-system/jsx';
import { Sortable } from '@theasset/ui/sortable';

import { FilePreviewProps } from '../FilePreview';
import { MergePdfActionsMobile } from './filePreviewMobile/MergePdfActionsMobile';

export const FilePreviewMobile = ({ files, setFiles }: FilePreviewProps) => (
	<Sortable.Root orientation="vertical" value={files} onValueChange={setFiles}>
		<Stack direction="column" marginInline="auto" width="100%" paddingBlock={4} paddingInline={4}>
			{files.map(file => (
				<Sortable.SortableItem key={file.id} value={file.id} asChild>
					<PdfThumbnailMobile
						file={file}
						actions={({ file }) => <MergePdfActionsMobile file={file} setFiles={setFiles} />}
					/>
				</Sortable.SortableItem>
			))}
		</Stack>
	</Sortable.Root>
);
