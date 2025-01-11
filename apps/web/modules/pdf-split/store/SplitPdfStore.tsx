'use client';

import { PropsWithChildren, createContext, use, useState } from 'react';

import { useThePdfTools } from '@theasset/pdf-react/context/the-pdf-actions-context';
import { FileState } from '@theasset/pdf-tools';

import { SplitRange, addRange, removeRangeByIndex } from '../domain/SplitRange';

type SplitFileMetadata = {
	page: number;
	isCut: boolean;
};
export type SplitFile = FileState & SplitFileMetadata;

type SplitPdfState = {
	files: SplitFile[];
	ranges: SplitRange[];
	hasFiles: boolean;
	onSortFiles: (items: SplitFile[]) => void;
	onFileChange: (id: number, newFile: SplitFile) => void;
	onRemoveFile: (id: number) => void;
	onChange: (files: File[]) => void;
	toggleCut: (id: number, value: boolean) => void;
};

const SplitPdfStateContext = createContext<SplitPdfState>({
	files: [],
	ranges: [],
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
	},
	toggleCut: () => {
		throw new Error('No SplitPdfStateContext provided');
	}
});

export const SplitPdfStore = ({ children }: PropsWithChildren) => {
	const [ranges, setRange] = useState<SplitRange[]>([]);
	const [files, setFiles] = useState<SplitFile[]>([]);
	const { pdfTools } = useThePdfTools();

	const onChange = async (files: File[]) => {
		for (const file of files) {
			const fileState = await pdfTools.addFileAsPages(file);
			const splitFiles = fileState.map(
				(file, index) =>
					({
						...file,
						page: index + 1
					}) as SplitFile
			);

			setFiles(currentFiles => [...currentFiles, ...splitFiles]);
		}
	};

	const onFileChange = (id: number, newFile: SplitFile) => {
		setFiles(files => {
			const fileIndex = files.findIndex(file => id === file.id);

			const newFiles = [...files];
			newFiles[fileIndex] = newFile;

			return newFiles;
		});
	};

	const onRemoveFile = (id: number) =>
		setFiles(currentFiles => currentFiles.filter(file => file.id !== id));

	const onSortFiles = (items: SplitFile[]) => setFiles(items);

	const hasFiles = files.length > 0;

	const toggleCut = (index: number, value: boolean) => {
		if (value) {
			const newRanges = addRange(ranges, index);
			setRange(newRanges);
		} else {
			const newRanges = removeRangeByIndex(ranges, index);
			setRange(newRanges);
		}
	};

	return (
		<SplitPdfStateContext
			value={{
				files,
				hasFiles,
				ranges,
				onSortFiles,
				onChange,
				onFileChange,
				onRemoveFile,
				toggleCut
			}}>
			{children}
		</SplitPdfStateContext>
	);
};

export const useSplitPdfStore = () => use(SplitPdfStateContext);
