import * as Thumbnail from '@theasset/ui/thumbnail';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { getSingularOrPlural } from '@theasset/internationalization/infra/get-singular-or-plural';
import { Badge } from '@theasset/ui/badge';

import { usePages } from '../../hooks/usePages';
import { useThumbnail } from '../../hooks/useThumbnail';
import { PdfThumbnailProps } from '../PdfThumbnail';
import { PdfThumbnailSkeleton } from './PdfThumbnailSkeleton';

type PdfThumbnailDetailProps = PdfThumbnailProps;

export const PdfThumbnailDetail = (props: PdfThumbnailDetailProps) => {
	const { file, actions, setFiles } = props;

	const { shared } = useLocale();
	const { src, rotation } = useThumbnail({ file });
	const pages = usePages(file);

	return (
		<Thumbnail.Suspense fallback={<PdfThumbnailSkeleton {...props} />}>
			<Thumbnail.Root>
				<Thumbnail.Body>
					<Thumbnail.Image src={src} alt={file.name} data-rotation={rotation} shadow />

					<Thumbnail.Metadata>
						<Thumbnail.FileName>{file.name}</Thumbnail.FileName>

						<Badge capitalize>
							{pages} {getSingularOrPlural(shared.page, pages)}
						</Badge>
					</Thumbnail.Metadata>

					<Thumbnail.DragHandler />
				</Thumbnail.Body>

				<Thumbnail.ActionsBox>
					{actions && actions({ file, isError: false, setFiles })}
				</Thumbnail.ActionsBox>
			</Thumbnail.Root>
		</Thumbnail.Suspense>
	);
};
