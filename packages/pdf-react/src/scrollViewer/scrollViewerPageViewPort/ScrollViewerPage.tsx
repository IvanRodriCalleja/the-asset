import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { useThumbnail } from '../../infra/useThumbnail';

type ScrollViewerPageProps = {
	page: number;
	file: TheAssetFile;
};

export const ScrollViewerPage = ({ page, file }: ScrollViewerPageProps) => {
	const { shared } = useLocale();
	const { src } = useThumbnail({ file, page });

	return <Thumbnail.Image src={src} alt={`${shared.page} ${page}`} />;
};
