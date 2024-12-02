import { useState } from 'react';

import { FileState, mergeManager } from '@theasset/pdf-tools';

export const useFilePickerState = () => {
	const [files, setFiles] = useState<FileState[]>([]);

	const onChange = async (files: File[]) => {
		const state = await mergeManager!.addFiles(files);
		setFiles(currentFiles => [...currentFiles, ...state]);
	};

	return { files, onChange, setFiles };
};
