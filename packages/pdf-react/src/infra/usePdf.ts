import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

import { useCache } from '@theasset/cache/useCache';
import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { getDocument } from '@theasset/pdf/document';

export const usePdf = (file: TheAssetFile): PDFDocumentProxy => {
	const pdf = useCache({ id: file.contentId, type: 'pdf' }, () =>
		getDocument({ buffer: file.buffer })
	);

	return pdf;
};
