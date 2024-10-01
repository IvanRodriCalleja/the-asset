import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { ThumbnailImage } from '@theasset/ui/thumbnail';

import { useThumbnail } from '../../../hooks/useThumbnail';

type ScrollViewerPageProps = {
	page: number;
	file: TheAssetFile;
};

export const ScrollViewerPage = ({ page, file }: ScrollViewerPageProps) => {
	const { shared } = useLocale();
	const { src } = useThumbnail({ file, page });

	return <ThumbnailImage src={src} alt={`${shared.page} ${page}`} />;
};
