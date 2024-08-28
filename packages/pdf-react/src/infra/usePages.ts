import { useCache } from '@theasset/cache/useCache';
import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { getPages } from '@theasset/pdf/decrypt';

export const usePages = (file: TheAssetFile): number => {
	const pages = useCache({ hash: file.hash, type: 'pages' }, async () => getPages(file.buffer));

	return pages;
};
