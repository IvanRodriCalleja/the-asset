import {
	decryptPdf,
	fromMemory,
	pages,
	toMemory
} from 'coherentpdf/dist/coherentpdf.browser.min.js';

export class DecryptError extends Error {
	constructor() {
		super('File encrypted with password');
	}
}

export const decrypt = (buffer: ArrayBuffer, password: string = ''): ArrayBuffer => {
	try {
		const arr = new Uint8Array(buffer);

		const pdf = fromMemory(arr, password);

		decryptPdf(pdf, password);

		const mem = toMemory(pdf, false, false);
		return mem;
	} catch (error) {
		throw new DecryptError();
	}
};

export const getPages = (pdf: ArrayBuffer): number => {
	const arr = new Uint8Array(pdf);

	const pdfDoc = fromMemory(arr, '');

	return pages(pdfDoc);
};
