import {
	type PdfDocument,
	hasPermission,
	isEncrypted as isPdfEncrypted,
	noEdit
} from 'coherentpdf/dist/coherentpdf.browser.js';

export const isEncrypted = (pdf: PdfDocument) => isPdfEncrypted(pdf);
export const isEditable = (pdf: PdfDocument) => !hasPermission(pdf, noEdit);
