'use client';

import { PropsWithChildren, createContext, use, useState } from 'react';

import { useThePdfTools } from '@theasset/pdf-react/context/the-pdf-actions-context';
import { FileState } from '@theasset/pdf-tools';

type MergePdfState = {
	files: FileState[];
	hasFiles: boolean;
	onSortFiles: (items: FileState[]) => void;
	onFileChange: (id: number, newFile: FileState) => void;
	onRemoveFile: (id: number) => void;
	onChange: (files: File[]) => Promise<void>;
};

const MergePdfStateContext = createContext<MergePdfState>({
	files: [],
	hasFiles: false,
	onSortFiles: () => {
		throw new Error('No MergePdfStateContext provided');
	},
	onFileChange: () => {
		throw new Error('No MergePdfStateContext provided');
	},
	onRemoveFile: () => {
		throw new Error('No MergePdfStateContext provided');
	},
	onChange: () => {
		throw new Error('No MergePdfStateContext provided');
	}
});

export const MergePdfStateProvider = ({ children }: PropsWithChildren) => {
	const [files, setFiles] = useState<FileState[]>([]);
	const { pdfTools } = useThePdfTools();

	const onChange = async (files: File[]) => {
		const state = await pdfTools.addFiles(files);
		setFiles(currentFiles => [...currentFiles, ...state]);
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
		<MergePdfStateContext
			value={{ files, hasFiles, onSortFiles, onChange, onFileChange, onRemoveFile }}>
			{children}
		</MergePdfStateContext>
	);
};

export const useMergePdfState = () => use(MergePdfStateContext);
