export type GetThumbnailResult = {
	src: string;
	width: number;
	height: number;
};

export type PdfResult = {
	buffer: Uint8Array;
	hash: string;
};

export { Direction } from './build/web/pdf_tools';
