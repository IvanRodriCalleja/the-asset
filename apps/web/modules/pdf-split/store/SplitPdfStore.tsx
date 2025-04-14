'use client';

import { PropsWithChildren, createContext, startTransition, use, useState } from 'react';

import { useThePdfTools } from '@theasset/pdf-react/context/the-pdf-actions-context';
import { FileState } from '@theasset/pdf-tools';

import {
	SplitRange,
	addRange,
	changeRangeFrom,
	changeRangeTo,
	removeRangeByIndex,
	splitInEqualRanges
} from '../domain/SplitRange';

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
	onRangeFocus: (index: number) => void;
	onRangeBlur: () => void;
	onRangeFromChange: (index: number, value: number) => void;
	onRangeToChange: (index: number, value: number) => void;
	onRemoveRange: (index: number) => void;
	onRenameRange: (index: number, name: string) => void;
	onAddRange: () => void;
	onSplitInEqualRanges: (splitAfterNPages: number) => void;
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
	},
	onRangeFocus: () => {
		throw new Error('No SplitPdfStateContext provided');
	},
	onRangeBlur: () => {
		throw new Error('No SplitPdfStateContext provided');
	},
	onRangeFromChange: () => {
		throw new Error('No SplitPdfStateContext provided');
	},
	onRangeToChange: () => {
		throw new Error('No SplitPdfStateContext provided');
	},
	onRemoveRange: () => {
		throw new Error('No SplitPdfStateContext provided');
	},
	onRenameRange: () => {
		throw new Error('No SplitPdfStateContext provided');
	},
	onAddRange: () => {
		throw new Error('No SplitPdfStateContext provided');
	},
	onSplitInEqualRanges: () => {
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

	const toggleCut = (index: number, value: boolean) => {
		const newRanges = value ? addRange(ranges, index) : removeRangeByIndex(ranges, index);
		setRange(newRanges);
	};

	const onRangeFocus = (index: number) => {
		setRange(currentRanges =>
			currentRanges.map((range, i) => ({
				...range,
				isFocused: i === index
			}))
		);
	};

	const onRangeBlur = () => {
		const newRanges = ranges.map(range => ({
			...range,
			isFocused: false
		}));

		setRange(newRanges);
	};

	const onRangeFromChange = (index: number, value: number) =>
		setRange(currentRanges => changeRangeFrom(currentRanges, index, value));

	const onRangeToChange = (index: number, value: number) =>
		setRange(currentRanges => changeRangeTo(currentRanges, index, value, files.length));

	const onRemoveRange = (index: number) =>
		setRange(currentRanges => currentRanges.filter((_, i) => i !== index));

	const onRenameRange = (index: number, name: string) =>
		setRange(currentRanges =>
			currentRanges.map((range, i) => (i === index ? { ...range, name } : range))
		);

	const onAddRange = () => {
		const lastRange = ranges[ranges.length - 1];
		const newRange = {
			id: lastRange ? lastRange.id + 1 : 0,
			from: lastRange ? lastRange.to + 1 : 0,
			to: lastRange ? lastRange.to + 1 : 0,
			name: '',
			isFocused: false
		};

		return startTransition(() => {
			const newRanges = addRange(ranges, newRange.from);
			setRange(newRanges);
		});
	};

	const onSplitInEqualRanges = (splitAfterNPages: number) => {
		debugger;
		const newRanges = splitInEqualRanges(files.length, splitAfterNPages);
		setRange(newRanges);
	};

	const hasFiles = files.length > 0;

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
				toggleCut,
				onRangeFocus,
				onRangeBlur,
				onRangeFromChange,
				onRangeToChange,
				onRemoveRange,
				onRenameRange,
				onAddRange,
				onSplitInEqualRanges
			}}>
			{children}
		</SplitPdfStateContext>
	);
};

export const useSplitPdfStore = () => use(SplitPdfStateContext);
