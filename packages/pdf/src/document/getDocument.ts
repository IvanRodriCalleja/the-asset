import * as PDFJS from 'pdfjs-dist/build/pdf.min.mjs';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

type GetDocumentProps = {
	buffer: ArrayBuffer;
};

export const getDocument = async ({ buffer }: GetDocumentProps): Promise<PDFDocumentProxy> => {
	await import('pdfjs-dist/build/pdf.worker.mjs');

	const pdf = await PDFJS.getDocument({
		data: new Uint8Array(buffer),
		useSystemFonts: true,
		stopAtErrors: false
	}).promise;

	return pdf;
};
