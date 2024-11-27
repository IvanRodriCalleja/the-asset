import { useCache } from '@theasset/cache/useCache';
import { type FileState } from '@theasset/pdf-tools';

import { useThePdfActions } from '../context/ThePdfActionsContext';

type UseThumbnailProps = {
	file: FileState;
	page?: number;
};

export const useThumbnail = ({ file, page = 0 }: UseThumbnailProps) => {
	const { getThumbnail } = useThePdfActions();
	const thumbnail = useCache({ hash: file.hash, type: 'image', page }, () =>
		getThumbnail(file.id, page)
	);

	return thumbnail;
};
