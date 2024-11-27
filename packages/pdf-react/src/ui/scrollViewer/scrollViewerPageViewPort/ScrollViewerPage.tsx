import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { getSingularOrPlural } from '@theasset/internationalization/infra/get-singular-or-plural';
import { FileState } from '@theasset/pdf-tools';
import { ThumbnailImage } from '@theasset/ui/thumbnail';

import { useThumbnail } from '../../../hooks/useThumbnail';

type ScrollViewerPageProps = {
	page: number;
	file: FileState;
};

export const ScrollViewerPage = ({ page, file }: ScrollViewerPageProps) => {
	const { shared } = useLocale();
	const { src, rotation } = useThumbnail({ file, page });
	const currentPage = page + 1;

	return (
		<ThumbnailImage
			src={src}
			alt={`${getSingularOrPlural(shared.page, currentPage)} ${currentPage}`}
			data-rotation={rotation}
		/>
	);
};
