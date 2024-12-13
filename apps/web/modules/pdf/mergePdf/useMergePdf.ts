import { useState } from 'react';

import { FileState, mergeManager } from '@theasset/pdf-tools';

export const useMergePdf = () => {
	const [files, setFiles] = useState<FileState[]>([]);

	const onChange = async (files: File[]) => {
		const state = await mergeManager!.addFiles(files);
		setFiles(currentFiles => [...currentFiles, ...state]);
	};

	const hasFiles = files.length > 0;

	return { files, hasFiles, setFiles, onChange };
};
