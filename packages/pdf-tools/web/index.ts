import { createWorkerMainImplementation } from './createWorkerMainImplementation';
import type { PdfToolsImpl } from './worker';

const worker = new Worker(new URL('./worker.ts', import.meta.url));

export const mergeManager = createWorkerMainImplementation<PdfToolsImpl>(worker);

export { type FileState, type UpdatedFileState } from './types';
