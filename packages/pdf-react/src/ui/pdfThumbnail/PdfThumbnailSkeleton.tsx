import * as Thumbnail from '@theasset/ui/thumbnail';
import { FileState } from '@theasset/pdf-tools';
import { Skeleton } from '@theasset/ui/skeleton';

import { PdfThumbnailAction } from '../PdfThumbnail';

type PdfThumbnailSkeletonProps = {
	file: FileState;
	actions?: PdfThumbnailAction;
};

export const PdfThumbnailSkeleton = ({ file, actions }: PdfThumbnailSkeletonProps) => (
	<Thumbnail.Root status="active">
		<Thumbnail.Body>
			<Thumbnail.ImageArea>
				<Skeleton width="100%" height="100%" />
			</Thumbnail.ImageArea>

			<Thumbnail.Metadata>
				<Thumbnail.FileName data-testid="pdf-name">{file.name}</Thumbnail.FileName>

				<Skeleton width="76px" height="22px" borderRadius="11px" />
			</Thumbnail.Metadata>

			<Thumbnail.DragHandler />
		</Thumbnail.Body>

		<Thumbnail.ActionsBox>{actions && actions({ file, isError: false })}</Thumbnail.ActionsBox>
	</Thumbnail.Root>
);
