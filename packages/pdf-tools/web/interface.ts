import { Direction, PdfToolsErrorCodes } from '../build/web/pdf_tools';

export type GetThumbnailMessage = {
	type: 'getThumbnail';
	id: number;
	buffer: Uint8Array;
	page: number;
};

export type GetPagesMessage = {
	type: 'getPages';
	id: number;
	buffer: Uint8Array;
};

export type RotatePdfPageMessage = {
	type: 'rotatePdfPage';
	id: number;
	buffer: Uint8Array;
	page: number;
	direction: Direction;
};

export type RotatePdfMessage = {
	type: 'rotatePdf';
	id: number;
	buffer: Uint8Array;
	direction: Direction;
};

export type RemovePdfPageMessage = {
	type: 'removePdfPage';
	id: number;
	buffer: Uint8Array;
	index: number;
};

export type MergePdfsMessage = {
	type: 'mergePdfs';
	id: number;
	buffers: Array<Uint8Array>;
};

export type DecryptPdfsMessage = {
	type: 'decryptPdf';
	id: number;
	buffer: Uint8Array;
	password: string;
};

export type WorkerMessage =
	| GetThumbnailMessage
	| GetPagesMessage
	| RotatePdfPageMessage
	| RotatePdfMessage
	| RemovePdfPageMessage
	| MergePdfsMessage
	| DecryptPdfsMessage;

export type WorkerResponse<T = unknown> =
	| {
			id: number;
			data: T;
	  }
	| {
			id: number;
			errorCode: PdfToolsErrorCodes;
	  };

export type WorkerError = {
	id: number;
	error: string;
};
