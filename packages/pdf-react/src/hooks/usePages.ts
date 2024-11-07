import { useCache } from '@theasset/cache/useCache';
import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { getTotalPages } from '@theasset/pdf-tools';

export const usePages = (file: TheAssetFile): number => {
	const pages = useCache({ hash: file.hash, type: 'pages' }, () =>
		getTotalPages(new Uint8Array(file.buffer))
	);

	return pages;
};
