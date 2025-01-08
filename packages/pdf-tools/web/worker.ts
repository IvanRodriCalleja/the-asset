import { createWorkerImplementationProxy } from '@theasset/utilities/infra';

import { loadTools } from './loadPdfTools';
import {
	AddFileInput,
	PdfToolsError as PdfError,
	PdfTools as PdfToolsWasm
} from './output/pdf_tools';
import { Direction, ErrorCode, FileState, GetThumbnailResult, UpdatedFileState } from './types';

const loadPromise = loadTools();

class PdfTools {
	private count = 1;
	// @ts-expect-error
	private mergeToolManager: PdfToolsWasm;

	private addingPromises = new Map<number, Promise<void> | null>();

	constructor() {
		loadPromise.then(() => {
			this.mergeToolManager = new PdfToolsWasm();
		});
	}

	private readFile = (file: File): Promise<Uint8Array> =>
		new Promise<Uint8Array>((resolve, reject) => {
			const fileReader = new FileReader();

			fileReader.onerror = reject;

			fileReader.onload = event => {
				const buffer = new Uint8Array(event.target!.result as ArrayBuffer);
				resolve(buffer);
			};

			fileReader.readAsArrayBuffer(file);
		});

	private bridgeAddFiles = (files: File[], idFrom: number) => {
		const promises = files.map(async (file, index) => {
			const buffer = await this.readFile(file);
			const id = idFrom + index;
			const fileInput = new AddFileInput(id, buffer, file.name);

			this.mergeToolManager.add_file(fileInput);
		});

		promises.forEach((promise, index) => {
			this.addingPromises.set(idFrom + index, promise);

			promise.finally(() => {
				this.addingPromises.delete(idFrom + index);
			});
		});

		return promises;
	};

	public addFiles = (files: File[]): FileState[] => {
		const idFrom = this.count;
		this.count += files.length;

		this.bridgeAddFiles(files, idFrom);

		return [...Array(files.length)].map((_, index) => ({
			id: idFrom + index,
			hash: `${idFrom + index}`,
			isEncrypted: false,
			name: files[index]!.name
		}));
	};

	public addFileAsPages = async (file: File): Promise<FileState[]> => {
		this.count++;

		const buffer = await this.readFile(file);
		const fileName = file.name;
		const fileInput = new AddFileInput(this.count, buffer, fileName);

		const result = this.mergeToolManager.add_file_as_page(fileInput);

		this.count += result.length;

		return result.map(fileState => ({
			id: fileState.id,
			hash: fileState.hash,
			isEncrypted: false,
			name: fileName
		}));
	};

	public removeFile = async (id: number): Promise<void> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		this.mergeToolManager.remove_file(id);
	};

	public getThumbnail = async (id: number, page: number): Promise<GetThumbnailResult> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		try {
			const result = this.mergeToolManager.get_thumbnail(id, page);

			return {
				height: result.height,
				rotation: result.rotation,
				src: result.src,
				width: result.width
			};
		} catch (error) {
			const pdfError = error as PdfError;

			const errorCode: ErrorCode = {
				code: pdfError.code
			};

			throw errorCode;
		}
	};

	public getTotalPages = async (id: number): Promise<number> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		return this.mergeToolManager.get_total_pages(id);
	};

	public rotatePdf = async (id: number, direction: Direction): Promise<UpdatedFileState> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		const result = this.mergeToolManager.rotate_pdf(id, direction);

		return {
			hash: result.hash,
			id
		};
	};

	public rotatePdfPage = async (
		id: number,
		page: number,
		direction: Direction
	): Promise<UpdatedFileState> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		const result = this.mergeToolManager.rotate_pdf_page(id, page, direction);

		return {
			hash: result.hash,
			id
		};
	};

	public removePdfPage = async (id: number, page: number): Promise<UpdatedFileState> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		const result = this.mergeToolManager.remove_pdf_page(id, page);

		return {
			hash: result.hash,
			id
		};
	};

	public mergePdfs = (ids: number[]) => {
		const result = this.mergeToolManager.merge_files(Uint16Array.from(ids));
		this.mergeToolManager = new PdfToolsWasm();
		this.count++;

		this.mergeToolManager.add_file(new AddFileInput(this.count, result.buffer, 'merged.pdf'));

		return {
			hash: result.hash,
			id: this.count
		};
	};

	public decryptPdf = async (id: number, password: string): Promise<UpdatedFileState> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		try {
			const result = this.mergeToolManager.decrypt_pdf(id, password);

			return {
				hash: result.hash,
				id,
				isEncrypted: false
			};
		} catch (error) {
			const pdfError = error as PdfError;

			const errorCode: ErrorCode = {
				code: pdfError.code
			};

			throw errorCode;
		}
	};

	public getFileSize = async (id: number): Promise<string> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		return this.mergeToolManager.get_file_size(id);
	};

	public getFile = async (id: number): Promise<Uint8Array> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		return this.mergeToolManager.get_file(id);
	};
}

createWorkerImplementationProxy(new PdfTools());

export type PdfToolsImpl = PdfTools;
