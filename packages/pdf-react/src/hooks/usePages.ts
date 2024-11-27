import { useCache } from '@theasset/cache/useCache';
import { FileState } from '@theasset/pdf-tools';

import { useThePdfActions } from '../context/ThePdfActionsContext';

export const usePages = (file: FileState): number => {
	const { getTotalPages } = useThePdfActions();
	const pages = useCache({ hash: file.hash, type: 'pages' }, () => getTotalPages(file.id));

	return pages;
};
