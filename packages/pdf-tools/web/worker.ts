//TODO: Use BufferArray and convert here the Unit8Array
import { GetThumbnailResult, PdfResult, PdfToolsErrorCodes } from '../pdf-tools';
import {
	DecryptPdfsMessage,
	GetPagesMessage,
	GetThumbnailMessage,
	MergePdfsMessage,
	RemovePdfPageMessage,
	RotatePdfMessage,
	RotatePdfPageMessage,
	WorkerMessage,
	WorkerResponse
} from './interface';
import {
	PdfToolsError as PdfError,
	decrypt_pdf,
	get_thumbnail,
	get_total_pages,
	loadTools,
	merge_pdfs,
	remove_pdf_page,
	rotate_pdf,
	rotate_pdf_page
} from './loadPdfTools';

loadTools();

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
	const message = event.data;

	let result;

	try {
		switch (message.type) {
			case 'getThumbnail':
				result = await getThumbnail(message);
				break;

			case 'getPages':
				result = await getPages(message);
				break;

			case 'rotatePdfPage':
				result = await rotatePdfPage(message);
				break;

			case 'rotatePdf':
				result = await rotatePdf(message);
				break;

			case 'removePdfPage':
				result = await removePdfPage(message);
				break;

			case 'mergePdfs':
				result = await mergePdfs(message);
				break;

			case 'decryptPdf':
				result = await decryptPdfs(message);
				break;

			default:
				throw new Error(`Unknown message type: ${message}`);
		}

		const response: WorkerResponse = { id: message.id, data: result };
		self.postMessage(response);
	} catch (error) {
		const pdfError = error as PdfError;

		const errorResponse: WorkerResponse = {
			id: message.id,
			errorCode: pdfError.code as unknown as PdfToolsErrorCodes
		};
		self.postMessage(errorResponse);
	}
};

const getThumbnail = async ({ buffer, page }: GetThumbnailMessage) => {
	const thumbnail = await get_thumbnail(buffer, page);

	const result: GetThumbnailResult = {
		src: thumbnail.src,
		width: thumbnail.width,
		height: thumbnail.height,
		rotation: thumbnail.rotation
	};

	return result;
};

const getPages = async ({ buffer }: GetPagesMessage) => {
	const totalPages = await get_total_pages(buffer);

	return totalPages;
};

const rotatePdfPage = async ({ buffer, page, direction }: RotatePdfPageMessage) => {
	const pdf = await rotate_pdf_page(buffer, page, direction);

	const result: PdfResult = {
		buffer: pdf.buffer,
		hash: pdf.hash
	};

	return result;
};

const rotatePdf = async ({ buffer, direction }: RotatePdfMessage) => {
	const pdf = await rotate_pdf(buffer, direction);

	const result: PdfResult = {
		buffer: pdf.buffer,
		hash: pdf.hash
	};

	return result;
};

const removePdfPage = async ({ buffer, index }: RemovePdfPageMessage) => {
	const pdf = await remove_pdf_page(buffer, index);

	const result: PdfResult = {
		buffer: pdf.buffer,
		hash: pdf.hash
	};

	return result;
};

const mergePdfs = async ({ buffers }: MergePdfsMessage) => {
	const pdf = await merge_pdfs(buffers);

	const result: PdfResult = {
		buffer: pdf.buffer,
		hash: pdf.hash
	};

	return result;
};

const decryptPdfs = async ({ buffer, password }: DecryptPdfsMessage) => {
	const pdf = await decrypt_pdf(buffer, password);

	const result: PdfResult = {
		buffer: pdf.buffer,
		hash: pdf.hash
	};

	return result;
};
