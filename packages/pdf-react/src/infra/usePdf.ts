import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

import { cacheStore } from '@theasset/cache/store';
import { useCache } from '@theasset/cache/useCache';
import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { getDocument } from '@theasset/pdf/document';

export const usePdf = (file: TheAssetFile): PDFDocumentProxy => {
	const pdf = useCache({ hash: file.hash, type: 'pdf' }, () =>
		getDocument({ buffer: file.buffer })
	);

	return pdf;
};

export const seedPdf = (pdf: PDFDocumentProxy, hash: string) =>
	cacheStore.addEntry({ hash, type: 'pdf' }, { result: pdf });
