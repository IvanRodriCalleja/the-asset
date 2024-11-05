import { PdfToolsErrorCodes } from './build/web/pdf_tools';

export type GetThumbnailResult = {
	src: string;
	width: number;
	height: number;
	rotation: number;
};

export type PdfResult = {
	buffer: Uint8Array;
	hash: string;
};

export { Direction } from './build/web/pdf_tools';
export { PdfToolsErrorCodes };
export class PdfToolsError extends Error {
	public code: PdfToolsErrorCodes;

	constructor(code: PdfToolsErrorCodes) {
		super();
		this.code = code;
		this.name = 'PdfToolsError';
	}
}
