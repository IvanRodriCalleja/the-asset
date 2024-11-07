import { useCache } from '@theasset/cache/useCache';
import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { getThumbnail } from '@theasset/pdf-tools';

type UseThumbnailProps = {
	file: TheAssetFile;
	page?: number;
};

export const useThumbnail = ({ file, page = 0 }: UseThumbnailProps) => {
	const thumbnail = useCache({ hash: file.hash, type: 'image', page }, () =>
		getThumbnail({ buffer: new Uint8Array(file.buffer), page })
	);

	return thumbnail;
};
