import { Direction, GetThumbnailResult, PdfToolsError } from '../pdf-tools';
import {
	AddFileInput,
	MergeToolManager,
	PdfToolsError as PdfError,
	loadTools
} from './loadPdfTools';

const loadPromise = loadTools();

export type FileState = {
	id: string;
	hash: string;
	isEncrypted: boolean;
	name: string;
};

export type UpdatedFileState = Pick<FileState, 'hash' | 'id'> | Partial<FileState>;

class Manager {
	private count = 1;
	// @ts-expect-error
	private mergeToolManager: MergeToolManager;

	private addingPromises = new Map<string, Promise<void>>();

	constructor() {
		loadPromise.then(() => {
			this.mergeToolManager = new MergeToolManager();
		});
	}

	private bridgeAddFiles = (files: File[], idFrom: number) => {
		const promises = files.map(async (file, index) => {
			const buffer = await new Promise<Uint8Array>((resolve, reject) => {
				const fileReader = new FileReader();

				fileReader.onerror = reject;

				fileReader.onload = event => {
					const buffer = new Uint8Array(event.target!.result as ArrayBuffer);
					resolve(buffer);
				};

				fileReader.readAsArrayBuffer(file);
			});
			const id = `${idFrom + index}`;
			const fileInput = new AddFileInput(id, buffer, file.name);

			this.mergeToolManager.add_file(fileInput);
		});

		promises.forEach((promise, index) => {
			this.addingPromises.set(`${idFrom + index}`, promise);

			promise.finally(() => {
				this.addingPromises.delete(`${idFrom + index}`);
			});
		});

		return promises;
	};

	public addFiles = (files: File[]): FileState[] => {
		const idFrom = this.count;
		this.count += files.length;

		this.bridgeAddFiles(files, idFrom);

		return [...Array(files.length)].map((_, index) => ({
			id: `${idFrom + index}`,
			hash: `${idFrom + index}`,
			isEncrypted: false,
			name: files[index]!.name
		}));
	};

	public getThumbnail = async (id: string, page: number): Promise<GetThumbnailResult> => {
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

			throw new PdfToolsError(pdfError.code);
		}
	};

	public getTotalPages = async (id: string): Promise<number> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		return this.mergeToolManager.get_total_pages(id);
	};

	public rotatePdf = async (id: string, direction: Direction): Promise<UpdatedFileState> => {
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
		id: string,
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

	public removePdfPage = async (id: string, page: number): Promise<UpdatedFileState> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		const result = this.mergeToolManager.remove_pdf_page(id, page);

		return {
			hash: result.hash,
			id
		};
	};

	// TODO: Make it return a promise
	public mergePdfs = (ids: string[]) => {
		//TODO: Filter if any pdf is encrypted
		const result = this.mergeToolManager.merge_files(ids);
		this.mergeToolManager = new MergeToolManager();

		this.mergeToolManager.add_file(new AddFileInput(result.hash, result.buffer, 'merged.pdf'));

		return {
			hash: result.hash
		};
	};

	public decryptPdf = async (id: string, password: string): Promise<UpdatedFileState> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		const result = this.mergeToolManager.decrypt_pdf(id, password);

		return {
			hash: result.hash,
			id,
			isEncrypted: false
		};
	};

	public getFileSize = async (id: string): Promise<string> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		return this.mergeToolManager.get_file_size(id);
	};

	public getFile = async (id: string): Promise<Uint8Array> => {
		if (this.addingPromises.has(id)) {
			await this.addingPromises.get(id);
		}

		return this.mergeToolManager.get_file(id);
	};
}

export const mergeManager = new Manager();
