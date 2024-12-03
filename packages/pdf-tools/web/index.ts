import { createWorkerMainImplementation } from '@theasset/utilities/infra';

import { ErrorCode, PdfToolsError } from './types';
import type { PdfToolsImpl } from './worker';

const worker = new Worker(new URL('./worker.ts', import.meta.url));

export const mergeManager = createWorkerMainImplementation<PdfToolsImpl, Error | ErrorCode>(
	worker,
	error => {
		if ('code' in error) {
			return new PdfToolsError(error.code);
		}
		return error;
	}
);

export { type FileState, type UpdatedFileState } from './types';
