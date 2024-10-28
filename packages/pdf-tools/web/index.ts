import { Direction } from '../build/web/pdf_tools';
import { GetThumbnailResult, PdfResult } from '../pdf-tools';
import { WorkerMessage } from './interface';

const worker = new Worker(new URL('./worker.ts', import.meta.url));

const pendingPromises = new Map();

// Generador de IDs únicos
let currentId = 0;
const generateMessageId = () => ++currentId;

worker.onmessage = event => {
	const { id, data } = event.data;

	const { resolve } = pendingPromises.get(id) || {};
	if (resolve) {
		resolve(data);
		pendingPromises.delete(id); // Eliminamos la promesa resuelta
	}
};

//TODO: Use object as args
export const getThumbnail = (buffer: Uint8Array, page: number) => {
	const id = generateMessageId();

	const message: WorkerMessage = {
		type: 'getThumbnail',
		id,
		buffer,
		page
	};

	worker.postMessage(message);

	return new Promise<GetThumbnailResult>((resolve, reject) => {
		pendingPromises.set(id, { resolve, reject });
	});
};

export const getTotalPages = async (buffer: Uint8Array) => {
	const { fromMemory, pages } = await import('coherentpdf/dist/coherentpdf.browser.min.js');
	const arr = new Uint8Array(buffer);

	const pdfDoc = fromMemory(arr, '');

	return pages(pdfDoc);
};

type RotatePdfPage = {
	buffer: ArrayBuffer;
	page: number;
	direction: Direction;
};

export const rotatePdfPage = ({ buffer, page, direction }: RotatePdfPage) => {
	const id = generateMessageId();
	const message: WorkerMessage = {
		type: 'rotatePdfPage',
		id,
		buffer: new Uint8Array(buffer),
		page,
		direction
	};

	worker.postMessage(message);

	return new Promise<PdfResult>((resolve, reject) => {
		pendingPromises.set(id, { resolve, reject });
	});
};

type RotatePdf = {
	buffer: ArrayBuffer;
	direction: Direction;
};

export const rotatePdf = ({ buffer, direction }: RotatePdf) => {
	const id = generateMessageId();
	const message: WorkerMessage = {
		type: 'rotatePdf',
		id,
		buffer: new Uint8Array(buffer),
		direction
	};

	worker.postMessage(message);

	return new Promise<PdfResult>((resolve, reject) => {
		pendingPromises.set(id, { resolve, reject });
	});
};

type RemovePdfPage = {
	buffer: ArrayBuffer;
	index: number;
};

export const removePdfPage = ({ buffer, index }: RemovePdfPage) => {
	const id = generateMessageId();
	const message: WorkerMessage = {
		type: 'removePdfPage',
		id,
		buffer: new Uint8Array(buffer),
		index
	};

	worker.postMessage(message);

	return new Promise<PdfResult>((resolve, reject) => {
		pendingPromises.set(id, { resolve, reject });
	});
};

type MergePdfs = {
	buffers: Array<ArrayBuffer>;
};

export const mergePdfs = ({ buffers }: MergePdfs) => {
	const id = generateMessageId();
	const message: WorkerMessage = {
		type: 'mergePdfs',
		id,
		buffers: buffers.map(buffer => new Uint8Array(buffer))
	};

	worker.postMessage(message);

	return new Promise<PdfResult>((resolve, reject) => {
		pendingPromises.set(id, { resolve, reject });
	});
};

type DecryptPdf = {
	buffer: ArrayBuffer;
	password: string;
};

export class DecryptError extends Error {
	constructor() {
		super('File encrypted with password');
	}
}

export const decryptPdf = async ({ buffer, password }: DecryptPdf) => {
	const { decryptPdf, fromMemory, toMemory, setFast } = await import(
		'coherentpdf/dist/coherentpdf.browser.min.js'
	);

	setFast();

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

export const tryDecryptPdf = async ({ buffer, password }: DecryptPdf) => {
	const { decryptPdf, fromMemory, toMemory, setFast } = await import(
		'coherentpdf/dist/coherentpdf.browser.min.js'
	);

	setFast();

	try {
		const arr = new Uint8Array(buffer);

		const pdf = fromMemory(arr, password);

		decryptPdf(pdf, password);

		const mem = toMemory(pdf, false, false);
		return { buffer: mem, isEncrypted: false };
	} catch (error) {
		return { buffer, isEncrypted: true };
	}
};

type IsPdfEncrypted = {
	buffer: ArrayBuffer;
};

export const isPdfEncrypted = async ({ buffer }: IsPdfEncrypted) => {
	const { fromMemory, isEncrypted } = await import('coherentpdf/dist/coherentpdf.browser.min.js');

	const arr = new Uint8Array(buffer);

	const pdf = fromMemory(arr, '');

	return isEncrypted(pdf);
};

type CompressPdf = {
	buffer: ArrayBuffer;
};

export const compress = ({ buffer }: CompressPdf) => {
	const id = generateMessageId();
	const message: WorkerMessage = {
		type: 'compressPdf',
		id,
		buffer: new Uint8Array(buffer)
	};

	worker.postMessage(message);

	return new Promise<PdfResult>((resolve, reject) => {
		pendingPromises.set(id, { resolve, reject });
	});
};
