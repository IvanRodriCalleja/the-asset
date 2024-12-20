import { useCache } from '@theasset/cache/useCache';
import { FileState } from '@theasset/pdf-tools';

import { useThePdfTools } from '../context/ThePdfActionsContext';

export const usePages = (file: FileState): number => {
	const { pdfTools } = useThePdfTools();
	const pages = useCache({ hash: file.hash, type: 'pages' }, () => pdfTools.getTotalPages(file.id));

	return pages;
};
