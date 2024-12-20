import { useCache } from '@theasset/cache/useCache';
import { type FileState } from '@theasset/pdf-tools';

import { useThePdfTools } from '../context/ThePdfActionsContext';

type UseThumbnailProps = {
	file: FileState;
	page?: number;
};

export const useThumbnail = ({ file, page = 0 }: UseThumbnailProps) => {
	const { pdfTools } = useThePdfTools();
	const thumbnail = useCache({ hash: file.hash, type: 'image', page }, () =>
		pdfTools.getThumbnail(file.id, page)
	);

	return thumbnail;
};
