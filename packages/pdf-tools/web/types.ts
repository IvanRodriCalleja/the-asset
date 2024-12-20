import { PdfToolsErrorCodes } from './output/pdf_tools';

export type FileState = {
	id: string;
	hash: string;
	isEncrypted: boolean;
	name: string;
};

export type UpdatedFileState = Pick<FileState, 'hash' | 'id'> | Partial<FileState>;

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

export type ErrorCode = {
	code: PdfToolsErrorCodes;
};

export { Direction } from './output/pdf_tools';
export { PdfToolsErrorCodes };
export class PdfToolsError extends Error {
	public code: PdfToolsErrorCodes;

	constructor(code: PdfToolsErrorCodes) {
		super();
		this.code = code;
		this.name = 'PdfToolsError';
	}
}

export { type PdfToolsImpl } from './worker';
