import * as Thumbnail from '@theasset/ui/thumbnail';
import { FileState } from '@theasset/pdf-tools';
import { Badge } from '@theasset/ui/badge';

import { useThumbnail } from '../../hooks/useThumbnail';
import { PdfThumbnailProps } from '../PdfThumbnail';
import { PdfThumbnailSkeleton } from './PdfThumbnailSkeleton';

type PdfThumbnailDetailProps<T extends FileState> = PdfThumbnailProps<T> & {
	className?: string;
};

export const PdfThumbnailDetail = <T extends FileState>({
	shadow = true,
	pageText,
	status,
	...props
}: PdfThumbnailDetailProps<T> & Thumbnail.RootVariants) => {
	const { file, actions } = props;

	const { src, rotation } = useThumbnail({ file });

	return (
		<Thumbnail.Suspense fallback={<PdfThumbnailSkeleton {...props} />}>
			<Thumbnail.Root status={status} className={props.className}>
				<Thumbnail.Body>
					<Thumbnail.Image src={src} alt={file.name} data-rotation={rotation} shadow={shadow} />

					<Thumbnail.Metadata>
						<Thumbnail.FileName>{file.name}</Thumbnail.FileName>

						{pageText && <Badge capitalize>{pageText(file)}</Badge>}
					</Thumbnail.Metadata>

					<Thumbnail.DragHandler />
				</Thumbnail.Body>

				<Thumbnail.ActionsBox>{actions && actions({ file, isError: false })}</Thumbnail.ActionsBox>
			</Thumbnail.Root>
		</Thumbnail.Suspense>
	);
};
