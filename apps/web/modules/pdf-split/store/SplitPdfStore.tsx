'use client';

import { PropsWithChildren, createContext, use, useState } from 'react';

import { useThePdfTools } from '@theasset/pdf-react/context/the-pdf-actions-context';
import { FileState } from '@theasset/pdf-tools';

type SplitPdfState = {
	files: FileState[];
	hasFiles: boolean;
	onSortFiles: (items: FileState[]) => void;
	onFileChange: (id: number, newFile: FileState) => void;
	onRemoveFile: (id: number) => void;
	onChange: (files: File[]) => void;
};

const SplitPdfStateContext = createContext<SplitPdfState>({
	files: [],
	hasFiles: false,
	onSortFiles: () => {
		throw new Error('No SplitPdfStateContext provided');
	},
	onFileChange: () => {
		throw new Error('No SplitPdfStateContext provided');
	},
	onRemoveFile: () => {
		throw new Error('No SplitPdfStateContext provided');
	},
	onChange: () => {
		throw new Error('No SplitPdfStateContext provided');
	}
});

export const SplitPdfStore = ({ children }: PropsWithChildren) => {
	const [files, setFiles] = useState<FileState[]>([]);
	const { pdfTools } = useThePdfTools();

	const onChange = async (files: File[]) => {
		for (const file of files) {
			const fileState = await pdfTools.addFileAsPages(file);
			setFiles(currentFiles => [...currentFiles, ...fileState]);
		}
	};

	const onFileChange = (id: number, newFile: FileState) => {
		setFiles(files => {
			const fileIndex = files.findIndex(file => id === file.id);

			const newFiles = [...files];
			newFiles[fileIndex] = newFile;

			return newFiles;
		});
	};

	const onRemoveFile = (id: number) =>
		setFiles(currentFiles => currentFiles.filter(file => file.id !== id));

	const onSortFiles = (items: FileState[]) => setFiles(items);

	const hasFiles = files.length > 0;

	return (
		<SplitPdfStateContext
			value={{ files, hasFiles, onSortFiles, onChange, onFileChange, onRemoveFile }}>
			{children}
		</SplitPdfStateContext>
	);
};

export const useSplitPdfStore = () => use(SplitPdfStateContext);
