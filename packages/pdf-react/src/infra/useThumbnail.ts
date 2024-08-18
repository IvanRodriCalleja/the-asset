import { useCache } from '@theasset/cache/useCache';
import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { getThumbnail } from '@theasset/pdf/thumbnail';

import { usePdf } from './usePdf';

type UseThumbnailProps = {
	file: TheAssetFile;
	page?: number;
};

export const useThumbnail = ({ file, page = 1 }: UseThumbnailProps) => {
	const pdf = usePdf(file);

	const src = useCache({ id: file.contentId, type: 'image', page }, () =>
		getThumbnail({ pdf, page })
	);

	return src;
};
