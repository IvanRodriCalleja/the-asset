import { PdfToolsErrorCodes } from './output/pdf_tools';

export type FileState = {
	id: number;
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

export type SplitPdfRange = {
	pages: number[];
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

export class DecryptError extends Error {
	constructor() {
		super('File encrypted with password');
	}
}

export { type PdfToolsImpl } from './worker';
