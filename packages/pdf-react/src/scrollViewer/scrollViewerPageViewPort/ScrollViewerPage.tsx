import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { useThumbnail } from '../../infra/useThumbnail';

type ScrollViewerPageProps = {
	page: number;
	file: TheAssetFile;
};

export const ScrollViewerPage = ({ page, file }: ScrollViewerPageProps) => {
	const src = useThumbnail({ file, page });

	return <Thumbnail.Image src={src} alt="" />; // TODO: Add ALT
};
