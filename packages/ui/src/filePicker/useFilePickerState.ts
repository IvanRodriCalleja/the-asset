import { useState } from 'react';

import { useThePdfTools } from '@theasset/pdf-react/context/the-pdf-actions-context';
import { FileState } from '@theasset/pdf-tools';

export const useFilePickerState = () => {
	const [files, setFiles] = useState<FileState[]>([]);
	const { pdfTools } = useThePdfTools();

	const onChange = async (files: File[]) => {
		const state = await pdfTools.addFiles(files);
		setFiles(currentFiles => [...currentFiles, ...state]);
	};

	return { files, onChange, setFiles };
};
