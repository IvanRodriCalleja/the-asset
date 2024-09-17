// @ts-ignore
import { promises } from 'fs';
// @ts-ignore
import path from 'path';
// @ts-ignore
import { GetThumbnailResult } from 'pdf-tools';
import { MergePdfsMessage } from 'web/interface';

import init, {
	Direction,
	get_thumbnail,
	get_total_pages,
	initialize_pdfium_render,
	merge_pdfs,
	rotate_pdf,
	rotate_pdf_page
} from '../build/node/pdf_tools';
import PDFiumModule from '../pdfium/pdfium';

let isLoaded = false;

export const loadTools = async () => {
	if (isLoaded) return;

	const pdfiumModule = await PDFiumModule();

	const result = path.normalize(
		// @ts-ignore
		`${process.cwd()}/.next/${new URL('../build/web/pdf_tools_bg.wasm', import.meta.url).href.replace('/_next', '')}`
	);

	const buffer = await promises.readFile(result);

	const tools = await init(buffer);

	initialize_pdfium_render(
		pdfiumModule, // Emscripten-wrapped Pdfium WASM module
		tools, // wasm_bindgen-wrapped WASM module built from our Rust application
		false // Debugging flag; set this to true to get tracing information logged to the Javascript console
	);

	isLoaded = true;
};

export const getThumbnail = async (
	buffer: Uint8Array,
	pageIndex: number
): Promise<GetThumbnailResult> => {
	await loadTools();
	const result = await get_thumbnail(buffer, pageIndex);

	const message: GetThumbnailResult = {
		src: result.src,
		width: result.width,
		height: result.height
	};

	return message;
};

export const getTotalPages = async (buffer: Uint8Array): Promise<number> => {
	await loadTools();
	return get_total_pages(buffer);
};

//TODO: Unify types from web
type RotatePdfPage = {
	buffer: ArrayBuffer;
	page: number;
	direction: Direction;
};

export const rotatePdfPage = async ({
	buffer,
	page,
	direction
}: RotatePdfPage): Promise<Uint8Array> => {
	await loadTools();
	return rotate_pdf_page(new Uint8Array(buffer), page, direction);
};

//TODO: Unify types from web
type RotatePdf = {
	buffer: ArrayBuffer;
	direction: Direction;
};

export const rotatePdf = async ({ buffer, direction }: RotatePdf): Promise<Uint8Array> => {
	await loadTools();
	return rotate_pdf(new Uint8Array(buffer), direction);
};

//TODO: Unify types from web
type RemovePdfPage = {
	buffer: ArrayBuffer;
	index: number;
};

export const removePdfPage = async ({ buffer, index }: RemovePdfPage): Promise<Uint8Array> => {
	await loadTools();
	return rotate_pdf(new Uint8Array(buffer), index);
};

export const mergePdfs = async ({ buffers }: MergePdfsMessage): Promise<Uint8Array> => {
	await loadTools();
	return merge_pdfs(buffers.map(buffer => new Uint8Array(buffer)));
};

//TODO: Unify types from web
type DecryptPdf = {
	buffer: ArrayBuffer;
	password: string;
};
//TODO: Unify types from web
export class DecryptError extends Error {
	constructor() {
		super('File encrypted with password');
	}
}

export const decryptPdf = async ({ buffer, password }: DecryptPdf) => {
	const { decryptPdf, fromMemory, toMemory } = await import(
		'coherentpdf/dist/coherentpdf.browser.min.js'
	);

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

type IsPdfEncrypted = {
	buffer: ArrayBuffer;
};

export const isPdfEncrypted = async ({ buffer }: IsPdfEncrypted) => {
	const { fromMemory, isEncrypted } = await import('coherentpdf/dist/coherentpdf.browser.min.js');

	const arr = new Uint8Array(buffer);

	const pdf = fromMemory(arr, '');

	return isEncrypted(pdf);
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
