import * as PDFJS from 'pdfjs-dist/build/pdf.min.mjs';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

type GetDocumentProps = {
	buffer: Uint8Array;
};

export const getDocument = async ({ buffer }: GetDocumentProps): Promise<PDFDocumentProxy> => {
	await import('pdfjs-dist/build/pdf.worker.mjs');

	const pdf = await PDFJS.getDocument(buffer).promise;

	return pdf;
};
