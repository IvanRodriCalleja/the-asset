import { Dispatch, SetStateAction } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { rotatePdf } from '@theasset/pdf/merge';

type UseMergePdfActions = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const useMergePdfActions = ({ file, setFiles }: UseMergePdfActions) => {
	const onRemoveFile = () => {
		setFiles(currentFiles => {
			return currentFiles.filter(({ id }) => file.id !== id);
		});
	};

	const onRotateFile = async (direction: 'left' | 'right') => {
		const newPdf = await rotatePdf({
			buffer: file.buffer,
			rotation: direction === 'left' ? -90 : 90
		});

		setFiles(files => {
			const fileIndex = files.findIndex(({ id }) => id === file.id);

			const newFiles = [...files];
			newFiles[fileIndex] = {
				...file,
				id: new Date().getTime().toString(),
				buffer: newPdf
			};

			return newFiles;
		});
	};

	return { onRemoveFile, onRotateFile };
};
